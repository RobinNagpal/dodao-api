import { MutationUpsertGuideArgs } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';
import { logError } from '@/helpers/adapters/errorLogger';
import { PublishStatus } from '@/deprecatedSchemas/models/enums';
import { verifyJwt } from '@/helpers/login';

export default async function saveGuide(_: unknown, { spaceId, guideInput }: MutationUpsertGuideArgs, context: IncomingMessage) {
  try {
    const spaceById = await prisma.space.findUnique({ where: { id: spaceId } });
    if (!spaceById) {
      throw new Error('Space not found');
    }

    const existingGuide = await prisma.guide.findUnique({ where: { id: guideInput.id } });

    //const decodedJWT = verifyJwt(context);
    //const user = decodedJWT.accountId.toLowerCase();
    const currentUnixTime = Math.floor(Date.now() / 1000);

    if (!existingGuide) {
      // No existing guide - create a new guide with the provided status
      const savedObject = await prisma.guide.create({
        data: {
          id: guideInput.id,
          content: guideInput.content,
          uuid: guideInput.uuid,
          guideSource: guideInput.guideSource,
          thumbnail: guideInput.thumbnail,
          categories: guideInput.categories,
          discordWebhook: guideInput.guideIntegrations.discordWebhook,
          guideType: guideInput.guideType,
          publishStatus: guideInput.publishStatus as PublishStatus,
          socialShareImage: guideInput.socialShareImage,
          discordRolePassingCount: guideInput.guideIntegrations.discordRolePassingCount,
          showIncorrectOnCompletion: guideInput.showIncorrectOnCompletion,
          postSubmissionStepContent: guideInput.postSubmissionStepContent,
          //fix auth
          //authors:[user]
          authors: ['1234'],
          created: currentUnixTime,
          previousId: null,
          version: 1, // Default to 1 for a new guide
          spaceId: guideInput.space,
          guideName: guideInput.name,
          discordRoleIds: guideInput.guideIntegrations.discordRoleIds,
        },
      });
      return savedObject;
    } else {
      // Guide exists - update or republish based on the guide status
      if (guideInput.publishStatus === PublishStatus.Draft) {
        // If the existing guide is a draft, update it
        if (existingGuide.publishStatus === PublishStatus.Draft) {
          const savedObject = await prisma.guide.update({
            where: { id: guideInput.id },
            data: {
              ...guideInput,
              authors: ['1234'],
              created: currentUnixTime,
              previousId: existingGuide.id,
              version: existingGuide.version + 1,
            },
          });
          return savedObject;
        } else {
          // If the existing guide is live, create a new draft guide
          const savedObject = await prisma.guide.create({
            data: {
              ...guideInput,
              authors: ['1234'],
              created: currentUnixTime, // Update creation timestamp
              previousId: existingGuide.id,
              version: existingGuide.version + 1,
              spaceId: guideInput.space,
              guideName: guideInput.name,
              discordRoleIds: guideInput.guideIntegrations.discordRoleIds,
            },
          });
          return savedObject;
        }
      } else if (guideInput.publishStatus === PublishStatus.Live) {
        if (existingGuide.publishStatus === PublishStatus.Draft) {
          // If the existing guide is a draft, update it and change status to live
          const savedObject = await prisma.guide.update({
            where: { id: guideInput.id },
            data: {
              ...guideInput,
              authors: ['1234'],
              created: currentUnixTime,
              version: existingGuide.version + 1,
            },
          });
          return savedObject;
        } else {
          // If the existing guide is already live, return an error
          throw new Error('The guide is already live.');
        }
      }
    }
  } catch (e) {
    await logError((e as any)?.response?.data || 'Error in upsertGuide', {}, e as any, null, null);
    throw e;
  }
}
