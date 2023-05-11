import { AcademyModel } from '@/deprecatedSchemas/models/AcademyModel';
import { ByteModel } from '@/deprecatedSchemas/models/byte/ByteModel';
import { SimulationModel } from '@/deprecatedSchemas/models/simulation/SimulationModel';
import { TimelineModel } from '@/deprecatedSchemas/models/timeline/TimelineModel';
import { prisma } from '@/prisma';
import { Space } from '@prisma/client';
import fs from 'fs';
import { AcademyObjectTypes } from '@/helpers/academy/academyObjectTypes';
import { AcademyRepoInfo, ensureAcademyRepositoryIsAlreadyCloned, getAcademyRepoInfo } from '@/helpers/academy/gitAcademyRepoWrapper';
import { setAcademyGuidesInRedis } from '@/helpers/academy/writers/academyGuideWriter';
import { setAcademyObjectsInRedis } from '@/helpers/academy/writers/academyObjectWriter';
import { logError } from '@/helpers/adapters/errorLogger';
import { pullLatest } from '@/helpers/git/pullLatest';
import { GitGuideModel } from '@/helpers/gitGuides/model/GitGuideModel';

export async function getObjectsFromAcademy<T>(objectName: string, space: Space, repoInfo: AcademyRepoInfo): Promise<T[]> {
  try {
    const objectsJsonFile = repoInfo.repositoryPath + `/generated/${objectName}/main/json/${objectName}.json`;
    const objectFileNames: string[] = JSON.parse(fs.readFileSync(objectsJsonFile, 'utf8'));

    const objectModelsModels: T[] = [];
    for (const objectFileName of objectFileNames) {
      try {
        const objectFilePath = repoInfo.repositoryPath + `/generated/${objectName}/main/json/` + objectFileName;
        const objectContents = fs.readFileSync(objectFilePath, 'utf-8');
        if (objectContents) {
          objectModelsModels.push(JSON.parse(objectContents));
        }
      } catch (e) {
        console.error(`Failed reading one of the ${objectName} for space - ${space.id} - ${objectFileName}`);

        await logError(`Failed reading one of the ${objectName} - ${objectFileName}`, {}, e as Error, space.id, null);
        return [];
      }
    }

    return objectModelsModels;
  } catch (e) {
    console.error(`Failed ${objectName} from academy - ${space.id} - ${repoInfo.academyRepository}`);

    await logError(`Failed ${objectName} from academy - ${space.id} - ${repoInfo.academyRepository}`, {}, e as Error, space.id, null);
    return [];
  }
}

export async function getAcademyInfoFromRepository(space: Space): Promise<AcademyModel> {
  try {
    await ensureAcademyRepositoryIsAlreadyCloned(space);
  } catch (e) {
    console.error(`Got error in - ensureRepositoryIsAlreadyCloned - ${space.name} - ${(e as any).message}`);
    await logError('Got error in - ensureRepositoryIsAlreadyCloned', {}, e as Error, space.id, null);
  }
  const repoInfo = await getAcademyRepoInfo(space);
  console.log('academyrepoInfo', repoInfo);
  await pullLatest(space, repoInfo.repositoryPath);

  const byteModels: ByteModel[] = await getObjectsFromAcademy('bytes', space, repoInfo);
  const guideModels: GitGuideModel[] = await getObjectsFromAcademy('guides', space, repoInfo);
  const simulationsModels: SimulationModel[] = await getObjectsFromAcademy('simulations', space, repoInfo);
  const timelineModels: TimelineModel[] = await getObjectsFromAcademy('timelines', space, repoInfo);

  return {
    bytes: { main: byteModels },
    courses: { main: [] },
    guides: { main: guideModels },
    simulations: { main: simulationsModels },
    timelines: { main: timelineModels },
  };
}

export async function pullAcademyAndSetInRedis(space: Space): Promise<void> {
  const academyModel = await getAcademyInfoFromRepository(space);
  await setAcademyGuidesInRedis(space, academyModel.guides['main']);
  await setAcademyObjectsInRedis(space, academyModel.bytes['main'], AcademyObjectTypes.bytes);
  await setAcademyObjectsInRedis(space, academyModel.simulations['main'], AcademyObjectTypes.simulations);
  await setAcademyObjectsInRedis(space, academyModel.timelines['main'], AcademyObjectTypes.timelines);
}

export async function loadAllAcademyWebsites() {
  const spaceIntegrations = await prisma.spaceIntegration.findMany({ where: { academyRepository: { not: null } } });

  for (const spaceIntegration of spaceIntegrations) {
    const space = await prisma.space.findUnique({ where: { id: spaceIntegration.spaceId } });

    if (space) {
      console.log('load academy website from ', spaceIntegration?.academyRepository);
      await pullAcademyAndSetInRedis(space);
    }
  }
}
