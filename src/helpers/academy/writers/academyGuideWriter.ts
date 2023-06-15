import { transformGitGuideIntoGuide } from '@/deprecatedSchemas/models/gitGuides/transformGitGuideIntoGuide';
import { GuideSource } from '@/deprecatedSchemas/models/GuideModel';
import { Space } from '@prisma/client';
import fs from 'fs';
import { getAcademyRepoInfo, getRedisKeyForAcademyGuide, getRedisKeyForAcademyGuides } from '@/helpers/academy/gitAcademyRepoWrapper';
import { getAcademyGuideKeysFromRedis } from '@/helpers/academy/readers/academyGuideReader';
import { writeToFile } from '@/helpers/fileWriter';
import { getAuthor } from '@/helpers/getAuthor';
import { GitGuideModel } from '@/helpers/gitGuides/model/GitGuideModel';
import { setRedisValue } from '@/helpers/redis';
import { slugify } from '@/helpers/space/slugify';
import { add, commit, push } from 'isomorphic-git';
import http from 'isomorphic-git/http/node';
import yaml from 'js-yaml';

export async function setAcademyGuideInRedis(space: Space, gitGuideModel: GitGuideModel) {
  const guideModel = transformGitGuideIntoGuide(gitGuideModel, space, GuideSource.Academy);
  const guideKey = getRedisKeyForAcademyGuide(space.id, gitGuideModel.key);
  await setRedisValue(guideKey, JSON.stringify(guideModel));
}

export async function setAcademyGuidesArrayInRedis(spaceId: string, guideKeysArray: string[]) {
  const guideKey = getRedisKeyForAcademyGuides(spaceId);
  await setRedisValue(guideKey, JSON.stringify(guideKeysArray));
}

export async function setAcademyGuidesInRedis(space: Space, gitGuideModels: GitGuideModel[]) {
  const keys = gitGuideModels.map((g) => g.key);
  await setAcademyGuidesArrayInRedis(space.id, keys);
  for (const gitGuideModel of gitGuideModels) {
    await setAcademyGuideInRedis(space, gitGuideModel);
  }
}

interface WriteGuideToRepoParams {
  gitGuide: GitGuideModel;
  repositoryPath: string;
  absoluteGuidePath: string;
  accountId: string;
  saveGenerated: boolean;
  guideFileName?: string;
}

async function writeGuideToRepo({ gitGuide, repositoryPath, absoluteGuidePath, accountId, saveGenerated, guideFileName }: WriteGuideToRepoParams) {
  // ensureDirectoryExistence(absoluteGuidePath);

  const contents: string = yaml.dump(gitGuide);
  await writeToFile(absoluteGuidePath, contents);

  if (saveGenerated) {
    const generatedGuideRelativePath = `generated/guides/main/json/${guideFileName}.json`;
    await writeToFile(`${repositoryPath}/${generatedGuideRelativePath}`, JSON.stringify(gitGuide, null, 2));
  }
  await add({
    fs,
    dir: repositoryPath,
    filepath: '.',
  });
  await commit({
    fs,
    dir: repositoryPath,
    author: getAuthor(accountId),
    message: `update guide ${gitGuide.name}`,
  });

  const pushResult = await push({
    fs,
    http,
    dir: repositoryPath,
    remote: 'origin',
    ref: 'main',
    onAuth: () => ({ username: process.env.GITHUB_TOKEN }),
  });
  console.log('pushResult', pushResult);
}

async function appendToAcademyGuides(
  space: Space,
  gitGuide: GitGuideModel,
  guides: any,
  repositoryPath: string,
  guidesArray: string[],
  guideFileName: string,
  guidesYamlFile: string
) {
  console.log(`guide ${gitGuide.uuid} not present in guides.yaml. Adding a new one`, JSON.stringify(guides, null, 2));
  const guidesJsonFile = `${repositoryPath}/generated/guides/main/json/guides.json`;

  const updatesGuidesArray = [...guidesArray, `${guideFileName}.yaml`];
  const guidesJson = { guides: updatesGuidesArray };
  const contents: string = yaml.dump(guidesJson);

  await writeToFile(guidesYamlFile, contents);

  await writeToFile(
    guidesJsonFile,
    JSON.stringify(
      updatesGuidesArray.map((guideName) => guideName.replace('.yaml', '.json')),
      null,
      2
    )
  );

  const guideKeys = await getAcademyGuideKeysFromRedis(space.id);
  guideKeys.push(guideFileName);
  await setAcademyGuidesArrayInRedis(space.id, guideKeys);
}

export async function writeGuideToAcademyRepo(space: Space, gitGuide: GitGuideModel, accountId: string): Promise<GitGuideModel> {
  const { repositoryPath } = await getAcademyRepoInfo(space);

  const guidesYamlRelativePath = `src/guides/main/guides.yaml`;
  const guidesYamlFile = `${repositoryPath}/${guidesYamlRelativePath}`;
  const guides: any = yaml.load(fs.readFileSync(guidesYamlFile, 'utf8'));
  const guidesArray: string[] = guides?.guides?.length ? guides?.guides : [];
  const guidePath = `${repositoryPath}/src/guides/main/${gitGuide.uuid}.yaml`;

  const writeParams: WriteGuideToRepoParams = {
    gitGuide,
    repositoryPath,
    absoluteGuidePath: guidePath,
    accountId,
    saveGenerated: true,
  };

  if (!guidesArray.includes(gitGuide.uuid + '.yaml')) {
    const newGuideFileName = slugify(gitGuide.name + ' ' + space.name);

    writeParams.absoluteGuidePath = `${repositoryPath}/src/guides/main/${newGuideFileName}.yaml`;

    writeParams.guideFileName = newGuideFileName;
    gitGuide.key = newGuideFileName;
    await appendToAcademyGuides(space, gitGuide, guides, repositoryPath, guidesArray, newGuideFileName, guidesYamlFile);
  } else {
    writeParams.guideFileName = gitGuide.key;
    console.log(`updating in github repo ${gitGuide.uuid}`);
  }

  await writeGuideToRepo(writeParams);

  await setAcademyGuideInRedis(space, gitGuide);

  return gitGuide;
}
