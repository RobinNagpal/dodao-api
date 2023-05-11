import { PublishStatus } from '@/deprecatedSchemas/models/enums';
import { GuideModel, GuideSource, GuideWithoutSteps } from '@/deprecatedSchemas/models/GuideModel';
import { SpaceIntegrationModel } from '@/deprecatedSchemas/models/SpaceIntegrationModel';
import { prisma } from '@/prisma';
import { Space, SpaceIntegration } from '@prisma/client';
import fs from 'fs';
import { logError } from '@/helpers/adapters/errorLogger';
import { pullLatest } from '@/helpers/git/pullLatest';
import {
  ensureGuideRepositoryIsAlreadyCloned,
  getGuideRepoInfo,
  getRedisKeyForGuide,
  getRedisKeyForSpaceGuidesArray,
} from '@/helpers/gitGuides/gitGuideRepoWrapper';
import { setGuideInRedis, setGuidesArrayForSpaceInRedis } from '@/helpers/gitGuides/gitGuideWriter';
import { GitGuideModel } from '@/helpers/gitGuides/model/GitGuideModel';
import { getRedisValue } from '@/helpers/redis';

export async function getGitGuidesFromRepository(space: Space): Promise<GitGuideModel[]> {
  try {
    await ensureGuideRepositoryIsAlreadyCloned(space);
  } catch (e) {
    console.error(`Got error in - ensureRepositoryIsAlreadyCloned - ${space.name} - ${(e as any).message}`);
    await logError('Got error in - ensureRepositoryIsAlreadyCloned', {}, e as Error, space.id, null);
  }
  const repoInfo = await getGuideRepoInfo(space);
  await pullLatest(space, repoInfo.repositoryPath);
  const guidesJsonFile = repoInfo.repositoryPath + '/generated/json/guides.json';
  const guideFileNames: string[] = JSON.parse(fs.readFileSync(guidesJsonFile, 'utf8'));

  const guideModels: GitGuideModel[] = [];
  for (const guideFileName of guideFileNames) {
    try {
      const guideFilePath = repoInfo.repositoryPath + '/generated/json/' + guideFileName;
      const guideContents = fs.readFileSync(guideFilePath, 'utf-8');
      if (guideContents) {
        guideModels.push(JSON.parse(guideContents));
      }
    } catch (e) {
      console.error(`Failed reading one of the guides for space - ${space.id} - ${guideFileName}`);

      await logError(`Failed reading one of the guides - ${guideFileName}`, {}, e as Error, space.id, null);
      return [];
    }
  }
  return guideModels;
}

export async function loadAllGuidesForSpace(spaceId: string, spaceIntegration: SpaceIntegration) {
  const space: Space = await prisma.space.findUniqueOrThrow({ where: { id: spaceId } });
  if (spaceIntegration?.gitGuideRepositories?.length) {
    try {
      const spaceWithIntegrations: Space = { ...space };
      const gitGuideModels = await getGitGuidesFromRepository(spaceWithIntegrations);
      for (const gitGuideModel of gitGuideModels) {
        await setGuideInRedis(space, gitGuideModel);
      }

      await setGuidesArrayForSpaceInRedis(
        spaceId,
        gitGuideModels.map((guide) => guide.key)
      );
    } catch (e) {
      console.error(`Failed fetching  guides of - ${space.name} - ${(e as any).message}`);
      console.error(e);
      await logError(`Failed fetching  guides of - ${space.name}`, {}, e as Error, spaceId, null);
    }
  }
}

export async function getGuideKeysFromRedis(spaceId: string): Promise<string[]> {
  const guidesArrayKey = getRedisKeyForSpaceGuidesArray(spaceId);
  const guidesArrayString = await getRedisValue(guidesArrayKey);
  return guidesArrayString ? JSON.parse(guidesArrayString) : [];
}

export async function getGitGuideFromRedis(spaceId: string, guideKey: string): Promise<GuideModel | undefined> {
  const redisKeyForGuide = getRedisKeyForGuide(spaceId, guideKey);
  const guidesString = await getRedisValue(redisKeyForGuide);
  return guidesString ? JSON.parse(guidesString) : undefined;
}

export async function getAllGitGuidesForSpace(spaceId: string): Promise<GuideModel[]> {
  const keysForSpace = await getGuideKeysFromRedis(spaceId);
  const gitGuides: GuideModel[] = [];
  for (const guideKey of keysForSpace) {
    const guideModel = await getGitGuideFromRedis(spaceId, guideKey);
    if (guideModel) {
      gitGuides.push(guideModel);
    }
  }

  return gitGuides;
}

async function allGuidesForSpace(spaceId: string, publishStatus: PublishStatus[], revealSecrets: boolean) {
  const dbGuides: GuideWithoutSteps[] = [];

  const gitGuides: GuideWithoutSteps[] = await getAllGitGuidesForSpace(spaceId);

  return [
    ...dbGuides.map((dbGuide) => ({ ...dbGuide, guideSource: GuideSource.Database })),
    ...gitGuides.map((gitGuide) => ({ ...gitGuide, guideSource: GuideSource.Git })).filter((guide) => publishStatus.includes(guide.publishStatus)),
  ];
}

export async function getGitGuidesWithUuids(spaceId: string, uuids: string[], revealSecrets = false): Promise<GuideWithoutSteps[]> {
  const guidesForSpace = await allGuidesForSpace(spaceId, [PublishStatus.Live, PublishStatus.Draft], revealSecrets);
  return guidesForSpace.filter((guide) => uuids.includes(guide.uuid));
}
