import { isUserInput } from '@/deprecatedSchemas/helpers/stepItemTypes';
import { GuideModel } from '@/deprecatedSchemas/models/GuideModel';
import { GuideStepItemSubmission, GuideStepSubmission, GuideUserInput } from '@/graphql/generated/graphql';
import { getAcademyGuideFromRedis } from '@/helpers/academy/readers/academyGuideReader';
import { getDecodedJwtFromExpressReq } from '@/helpers/permissions/getJwtFromContext';
import { isUserAdminOfSpace } from '@/helpers/space/checkEditSpacePermission';
import { slugify } from '@/helpers/space/slugify';
import { prisma } from '@/prisma';
import { GuideSubmission } from '@prisma/client';
import { Request, Response } from 'express-serve-static-core';
import { Readable } from 'stream';

function convertToCSVRows(objArray: Record<string, any>[]) {
  const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
  let str = '';

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

function convertToCSVRowToHeaders(submission: Record<string, any>) {
  let str = '';

  // Header
  const headers = Object.keys(submission);
  str += headers.join(',') + '\r\n';

  return str;
}

const CHUNK_SIZE = 200; // you can adjust this value depending on your needs

function processSubmissions(guide: GuideModel, submissionsChunk: GuideSubmission[]) {
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

  const csvEntries = submissionsChunk.map((submission) => {
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

  return csvEntries;
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

    const firstElement = submissions.slice(0, 1);
    const csvHeaders = convertToCSVRowToHeaders(processSubmissions(guide, firstElement)[0]); // processSubmissions is the logic you have for processing and preparing the data

    // Convert the data to CSV in a streaming manner
    // Set up a readable stream
    const readableStream = new Readable({
      async read() {
        let skipCount = 0;
        let hasNext = true;
        this.push(csvHeaders);

        while (hasNext) {
          // Fetch data in chunks
          const submissionsChunk: GuideSubmission[] = await prisma.guideSubmission.findMany({
            where: {
              spaceId: spaceId as string,
              guideUuid: guideUuid as string,
            },
            skip: skipCount,
            take: CHUNK_SIZE,
          });

          // If the fetched chunk is smaller than CHUNK_SIZE, we're on the last page
          if (submissionsChunk.length < CHUNK_SIZE) {
            hasNext = false;
          }

          const csvEntriesChunk = processSubmissions(guide, submissionsChunk); // processSubmissions is the logic you have for processing and preparing the data

          // Send the chunk to the client
          this.push(convertToCSVRows(csvEntriesChunk));

          skipCount += CHUNK_SIZE;
        }
        this.push(null); // indicates the end of the data
      },
    });

    readableStream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Something went wrong' + error });
  }
}
