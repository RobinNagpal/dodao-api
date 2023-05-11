import { GuideModel } from '@/deprecatedSchemas/models/GuideModel';
import { getRedisKeyForAcademyGuide, getRedisKeyForAcademyGuides } from '@/helpers/academy/gitAcademyRepoWrapper';
import { getRedisValue } from '@/helpers/redis';

export async function getAcademyGuideKeysFromRedis(spaceId: string): Promise<string[]> {
  const guidesArrayKey = getRedisKeyForAcademyGuides(spaceId);
  const guidesArrayString = await getRedisValue(guidesArrayKey);
  return guidesArrayString ? JSON.parse(guidesArrayString) : [];
}

export async function getAcademyGuideFromRedis(spaceId: string, guideKey: string): Promise<GuideModel | undefined> {
  const redisKeyForGuide = getRedisKeyForAcademyGuide(spaceId, guideKey);
  const guidesString = await getRedisValue(redisKeyForGuide);
  return guidesString ? JSON.parse(guidesString) : undefined;
}

export async function getAllAcademyGuidesForSpace(spaceId: string): Promise<GuideModel[]> {
  const keysForSpace = await getAcademyGuideKeysFromRedis(spaceId);
  const gitGuides: GuideModel[] = [];
  for (const guideKey of keysForSpace) {
    const guideModel = await getAcademyGuideFromRedis(spaceId, guideKey);
    if (guideModel) {
      gitGuides.push(guideModel);
    }
  }

  return gitGuides;
}
