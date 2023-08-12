import { isUserInput } from '@/deprecatedSchemas/helpers/stepItemTypes';
import { GuideStepItemSubmission, GuideStepSubmission, GuideUserInput } from '@/graphql/generated/graphql';
import { getAcademyGuideFromRedis } from '@/helpers/academy/readers/academyGuideReader';
import { getDecodedJwtFromExpressReq } from '@/helpers/permissions/getJwtFromContext';
import { isUserAdminOfSpace } from '@/helpers/space/checkEditSpacePermission';
import { slugify } from '@/helpers/space/slugify';
import { prisma } from '@/prisma';
import { GuideSubmission } from '@prisma/client';
import { Request, Response } from 'express-serve-static-core';
import { Readable } from 'stream';

function convertToCSV(objArray: Record<string, any>[]) {
  const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
  let str = '';

  // Header
  const headers = Object.keys(array[0]);
  str += headers.join(',') + '\r\n';

  // Rows
  for (let i = 0; i < array.length; i++) {
    let line = '';
    for (const index in array[i]) {
      if (line !== '') line += ',';

      // Escape double quotes and encapsulate fields with double quotes
      let value = array[i][index] === null ? '' : array[i][index];
      value = value.toString().replace(/"/g, '""');
      line += `"${value}"`;
    }

    str += line + '\r\n';
  }

  return str;
}

export default async function downloadGuideSubmissionsCSV(req: Request, res: Response) {
  try {
    const jwtToken = getDecodedJwtFromExpressReq(req);
    const spaceId = req.query['spaceId'] as string;
    const space = await prisma.space.findUniqueOrThrow({
      where: {
        id: spaceId,
      },
    });
    isUserAdminOfSpace(jwtToken, space);

    // Set the response headers
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=guide_submissions.csv');

    const guideUuid = req.query['guideUuid'];
    // Get your data from Prisma
    const submissions: GuideSubmission[] = await prisma.guideSubmission.findMany({
      where: {
        spaceId: spaceId as string,
        guideUuid: guideUuid as string,
      },
    });

    const guide = await getAcademyGuideFromRedis(spaceId as string, guideUuid as string);

    if (!guide) throw new Error('Guide not found');

    const inputs: { uuid: string; label: string }[] = guide.steps
      .flatMap((step) => step.stepItems)
      .filter(isUserInput)
      .map((item) => {
        const userInput = item as GuideUserInput;
        return {
          uuid: userInput.uuid,
          label: userInput.label,
        };
      });

    const csvEntries = submissions.map((submission) => {
      const steps = submission.steps as GuideStepSubmission[];
      const entries: Array<[string, GuideStepItemSubmission]> = steps
        .flatMap((step) => step.itemResponses)
        .map((itemResponse) => [itemResponse.uuid, itemResponse]);
      const itemSubmissions: { [uuid: string]: GuideStepItemSubmission } = Object.fromEntries(entries);

      const inputsMap = Object.fromEntries(inputs.map((input) => [slugify(input.label), itemSubmissions[input.uuid]?.userInput || '']));

      return {
        id: submission.id,
        createdAt: new Date(submission.createdAt),
        createdBy: submission.createdByUsername,
        correctQuestionsCount: submission.correctQuestionsCount,
        ...inputsMap,
      };
    });

    // Convert the data to CSV in a streaming manner
    const readableStream = new Readable({
      read() {
        this.push(convertToCSV(csvEntries));
        this.push(null); // indicates the end of the data
      },
    });

    // Pipe the stream to the response
    readableStream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Something went wrong' + error });
  }
}
