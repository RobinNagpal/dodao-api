import { GuideInput, MutationUpsertGuideArgs } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';
import { logError } from '@/helpers/adapters/errorLogger';
import { PublishStatus } from '@/deprecatedSchemas/models/enums';
import { GuideSource, GuideType } from '@/deprecatedSchemas/models/GuideModel';
import { verifyJwt } from '@/helpers/login';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { slugify } from '@/helpers/space/slugify';
import { GuideStep as PrismaGuideStep } from '@prisma/client';

export interface GuideStep extends Omit<PrismaGuideStep, 'guideId'> {
  guideId?: string;
}


export function transformGuideInputSteps(input: GuideInput): GuideStep[] {
  return input.steps.map((step, index) => ({
    uuid: step.uuid,
    stepName: step.name,
    content: step.content,
    stepOrder: index,
    stepItems: step.stepItems,
    // Append uuid to the slugified name to ensure uniqueness
    id: `${slugify(step.name)}-${step.uuid}`,
    createdAt: new Date(),
  }));
}

export default async function saveGuide(_: unknown, { spaceId, guideInput }: MutationUpsertGuideArgs, context: IncomingMessage) {
  try {
    const spaceById = await prisma.space.findUnique({ where: { id: spaceId } });
    if (!spaceById) {
      throw new Error('Space not found');
    }

    const existingGuide = await prisma.guide.findUnique({ where: { id: guideInput.id } });
    const currentUnixTime = Math.floor(Date.now() / 1000);
    // const decodedJwt = checkEditSpacePermission(spaceById, context);
    // const user=decodedJwt.accountId;

    const buildGuideData = (isNewGuide: boolean) => ({
      id: guideInput.id,
      content: guideInput.content,
      uuid: guideInput.uuid,
      guideSource: guideInput.guideSource as GuideSource,
      thumbnail: guideInput.thumbnail || 'https://d31h13bdjwgzxs.cloudfront.net/QmWy8EeMnxqx96VEPx2NBwzqtKxvMQqVVYvmPKgAYS2cUi',
      categories: guideInput.categories,
      guideType: guideInput.guideType as GuideType,
      publishStatus: guideInput.publishStatus as PublishStatus,
      socialShareImage: guideInput.socialShareImage,
      showIncorrectOnCompletion: guideInput.showIncorrectOnCompletion,
      postSubmissionStepContent: guideInput.postSubmissionStepContent,
      authors: ['1234'],
      created: currentUnixTime,
      previousId: isNewGuide ? null : existingGuide!.id,
      version: isNewGuide ? 1 : existingGuide!.version + 1,
      spaceId: guideInput.space,
      guideName: guideInput.name,
      steps: {
        create: transformGuideInputSteps(guideInput),
      },
    });


    if (!existingGuide) {
      const savedObject = await prisma.guide.create({ data: buildGuideData(true) });
      return savedObject;
    } else {
      if (guideInput.publishStatus === PublishStatus.Draft) {
        if (existingGuide.publishStatus === PublishStatus.Draft) {
          const savedObject = await prisma.guide.update({
            where: { id: guideInput.id },
            data: buildGuideData(false),
          });
          return savedObject;
        } else {
          const savedObject = await prisma.guide.create({ data: buildGuideData(true) });
          return savedObject;
        }
      } else if (guideInput.publishStatus === PublishStatus.Live) {
        if (existingGuide.publishStatus === PublishStatus.Draft) {
          const savedObject = await prisma.guide.update({
            where: { id: guideInput.id },
            data: buildGuideData(false),
          });
          return savedObject;
        } else {
          throw new Error('The guide is already live.');
        }
      }
    }
  } catch (e) {
    await logError((e as any)?.response?.data || 'Error in upsertGuide', {}, e as any, null, null);
    throw e;
  }
}
