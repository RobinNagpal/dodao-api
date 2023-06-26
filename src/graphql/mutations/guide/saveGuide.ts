import { PublishStatus } from '@/deprecatedSchemas/models/enums';
import { GuideSource, GuideType } from '@/deprecatedSchemas/models/GuideModel';
import { GuideInput, MutationUpsertGuideArgs } from '@/graphql/generated/graphql';
import { logError } from '@/helpers/adapters/errorLogger';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { slugify } from '@/helpers/space/slugify';
import { prisma } from '@/prisma';
import { Guide, GuideStep as PrismaGuideStep } from '@prisma/client';
import { IncomingMessage } from 'http';

export interface GuideStep extends Omit<PrismaGuideStep, 'guideId'> {
  guideId?: string;
}

export function transformGuideInputSteps(input: GuideInput, guidePublishStatus: PublishStatus): GuideStep[] {
  return input.steps.map((step, index) => ({
    uuid: step.uuid,
    stepName: step.name,
    content: step.content,
    stepOrder: index,
    stepItems: step.stepItems,
    // Append uuid to the slugified name to ensure uniqueness
    uniqueId: `${step.uuid}-${guidePublishStatus}`,
    createdAt: new Date(),
  }));
}

export default async function saveGuide(_: unknown, { spaceId, guideInput }: MutationUpsertGuideArgs, context: IncomingMessage) {
  try {
    const spaceById = await prisma.space.findUnique({ where: { id: spaceId } });
    if (!spaceById) {
      throw new Error('Space not found');
    }

    const existingGuide = await prisma.guide.findUnique({ where: { uniqueId: guideInput.uniqueId } });
    const currentUnixTime = Math.floor(Date.now() / 1000);
    const decodedJwt = checkEditSpacePermission(spaceById, context);
    const user = decodedJwt.accountId;

    const buildGuideData = (createdBy: string, existingGuide?: Guide) => ({
      uniqueId: guideInput.uniqueId,
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
      authors: [createdBy],
      created: currentUnixTime,
      previousId: existingGuide ? null : existingGuide!.uniqueId,
      version: existingGuide ? 1 : existingGuide!.version + 1,
      spaceId: guideInput.space,
      guideName: guideInput.name,
      steps: {
        create: transformGuideInputSteps(guideInput, guideInput.publishStatus as PublishStatus),
      },
    });

    if (!existingGuide) {
      // No guide exists. User is saving for the first time. Or it existed in git, but not in DB
      const savedObject = await prisma.guide.create({ data: buildGuideData(user) });
      return savedObject;
    } else {
      if (guideInput.publishStatus === PublishStatus.Draft) {
        if (existingGuide.publishStatus === PublishStatus.Draft) {
          // No new steps need to be created in this case
          const savedObject = await prisma.guide.update({
            where: { uniqueId: guideInput.uniqueId },
            data: buildGuideData(user, existingGuide),
          });
          return savedObject;
        } else {
          const savedObject = await prisma.guide.create({ data: buildGuideData(user, existingGuide) });
          return savedObject;
        }
      } else if (guideInput.publishStatus === PublishStatus.Live) {
        if (existingGuide.publishStatus === PublishStatus.Draft) {
          const savedObject = await prisma.guide.update({
            where: { uniqueId: guideInput.uniqueId },
            data: buildGuideData(user, existingGuide),
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
