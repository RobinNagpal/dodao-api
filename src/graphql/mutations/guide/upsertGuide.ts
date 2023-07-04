import { PublishStatus } from '@/deprecatedSchemas/models/enums';
import { transformGitGuideIntoGuide } from '@/deprecatedSchemas/models/gitGuides/transformGitGuideIntoGuide';
import { GuideSource, GuideType } from '@/deprecatedSchemas/models/GuideModel';
import { GuideInput, MutationUpsertGuideArgs } from '@/graphql/generated/graphql';
import { ensureAcademyRepositoryIsAlreadyCloned } from '@/helpers/academy/gitAcademyRepoWrapper';
import { getAcademyGuideFromRedis } from '@/helpers/academy/readers/academyGuideReader';
import { writeGuideToAcademyRepo } from '@/helpers/academy/writers/academyGuideWriter';
import { logError } from '@/helpers/errorLogger';
import { GitGuideModel } from '@/helpers/gitGuides/model/GitGuideModel';
import { GitGuideQuestion } from '@/helpers/gitGuides/model/GitGuideQuestion';
import { GitUserDiscordConnect } from '@/helpers/gitGuides/model/GitGuideStepItem';
import { GitUserInput } from '@/helpers/gitGuides/model/GitUserInput';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { DoDaoJwtTokenPayload } from '@/types/session';
import { Space } from '@prisma/client';
import { IncomingMessage } from 'http';
import { JwtPayload } from 'jsonwebtoken';
import { v4 } from 'uuid';

async function transformToGitFormat(spaceId: string, input: GuideInput): Promise<GitGuideModel> {
  const existingGuide = await getAcademyGuideFromRedis(spaceId, input.uuid);
  return {
    categories: input.categories,
    content: input.content,
    created: new Date().toISOString(),
    guideType: input.guideType as GuideType,
    key: input.uuid,
    name: input.name,
    postSubmissionStepContent: input.postSubmissionStepContent || undefined,
    publishStatus: input.publishStatus as PublishStatus,

    socialShareImage: input.socialShareImage || undefined,
    steps: input.steps.map((step) => ({
      content: step.content,
      name: step.name,
      stepItems: step.stepItems.map((item) => {
        return {
          answerKeys: item.answerKeys,
          choices: item.choices?.map((choice) => ({
            content: choice.content,
            key: choice.key,
          })),
          content: item.content,
          label: item.label,
          questionType: item.questionType,
          required: item.required,
          type: item.type,
          uuid: item.uuid,
          explanation: item.explanation,
        } as GitGuideQuestion | GitUserInput | GitUserDiscordConnect;
      }),
      uuid: step.uuid,
    })),
    thumbnail:
      input.thumbnail ||
      // dodao logo
      'https://d31h13bdjwgzxs.cloudfront.net/QmWy8EeMnxqx96VEPx2NBwzqtKxvMQqVVYvmPKgAYS2cUi',
    uuid: input.uuid,
    version: existingGuide ? existingGuide.version + 1 : 1,
  };
}

async function saveToAcademyRepo(spaceById: Space, transformedToGit: GitGuideModel, decodedJwt: JwtPayload & DoDaoJwtTokenPayload) {
  await ensureAcademyRepositoryIsAlreadyCloned(spaceById);

  const gitGuideModel = await writeGuideToAcademyRepo(spaceById, transformedToGit, decodedJwt.accountId);

  return transformGitGuideIntoGuide(gitGuideModel, spaceById, GuideSource.Academy);
}

export default async function upsertGuide(parent: any, { spaceId, guideInput }: MutationUpsertGuideArgs, context: IncomingMessage) {
  try {
    const spaceById = await prisma.space.findUniqueOrThrow({ where: { id: spaceId } });
    if (!spaceById) throw new Error(`No space found: ${spaceId}`);

    const decodedJwt = checkEditSpacePermission(spaceById, context);

    const transformedToGit = await transformToGitFormat(spaceId, guideInput);

    const savedGuide = await saveToAcademyRepo(spaceById, transformedToGit, decodedJwt);

    prisma.guideIntegration.upsert({
      create: {
        id: v4(),
        guideUuid: savedGuide.uuid,
        createdAt: new Date(),
        createdBy: decodedJwt.accountId,
        discordRoleIds: guideInput.guideIntegrations.discordRoleIds,
        discordRolePassingCount: guideInput.guideIntegrations.discordRolePassingCount,
        discordWebhook: guideInput.guideIntegrations.discordWebhook,
        projectGalaxyCredentialId: guideInput.guideIntegrations.projectGalaxyCredentialId,
        projectGalaxyOatMintUrl: guideInput.guideIntegrations.projectGalaxyOatMintUrl,
        updatedAt: new Date(),
        updatedBy: decodedJwt.accountId,
        projectGalaxyOatPassingCount: guideInput.guideIntegrations.projectGalaxyOatPassingCount,
        spaceId: spaceById.id,
      },
      update: {
        discordRoleIds: guideInput.guideIntegrations.discordRoleIds,
        discordRolePassingCount: guideInput.guideIntegrations.discordRolePassingCount,
        discordWebhook: guideInput.guideIntegrations.discordWebhook,
        projectGalaxyCredentialId: guideInput.guideIntegrations.projectGalaxyCredentialId,
        projectGalaxyOatMintUrl: guideInput.guideIntegrations.projectGalaxyOatMintUrl,
        projectGalaxyOatPassingCount: guideInput.guideIntegrations.projectGalaxyOatPassingCount,
      },
      where: {
        spaceId_guideUuid: {
          guideUuid: savedGuide.id,
          spaceId: spaceId,
        },
      },
    });

    return savedGuide;
  } catch (e) {
    await logError((e as any)?.response?.data || 'Error in upsertGuide', {}, e as any, null, null);
    throw e;
  }
}
