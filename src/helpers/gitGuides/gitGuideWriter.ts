import { transformGitGuideIntoGuide } from '@/deprecatedSchemas/models/gitGuides/transformGitGuideIntoGuide';
import { GuideSource } from '@/deprecatedSchemas/models/GuideModel';
import { Space } from '@prisma/client';
import fs from 'fs';
import { writeToFile } from '@/helpers/fileWriter';
import { getAuthor } from '@/helpers/getAuthor';
import { MAIN_GIT_FOLDER_PATH } from '@/helpers/git/gitConstants';
import { getGuideKeysFromRedis } from '@/helpers/gitGuides/gitGuideReader';
import { getGuideRepoInfo, getRedisKeyForGuide, getRedisKeyForSpaceGuidesArray } from '@/helpers/gitGuides/gitGuideRepoWrapper';
import { GitGuideModel } from '@/helpers/gitGuides/model/GitGuideModel';
import { setRedisValue } from '@/helpers/redis';
import { slugify } from '@/helpers/space/slugify';
import { add, commit, push } from 'isomorphic-git';
import http from 'isomorphic-git/http/node';
import yaml from 'js-yaml';

export async function setGuideInRedis(space: Space, gitGuideModel: GitGuideModel) {
  const guideModel = transformGitGuideIntoGuide(gitGuideModel, space, GuideSource.Git);
  const guideKey = getRedisKeyForGuide(space.id, gitGuideModel.key);
  await setRedisValue(guideKey, JSON.stringify(guideModel));
}

export async function setGuidesArrayForSpaceInRedis(spaceId: string, guideKeysArray: string[]) {
  const guideKey = getRedisKeyForSpaceGuidesArray(spaceId);
  await setRedisValue(guideKey, JSON.stringify(guideKeysArray));
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
    const generatedGuideRelativePath = `generated/json/${guideFileName}.json`;
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

async function appendToSpaceGuides(
  space: Space,
  gitGuide: GitGuideModel,
  guides: any,
  repositoryPath: string,
  guidesArray: string[],
  guideFileName: string,
  guidesYamlFile: string,
) {
  console.log(`guide ${gitGuide.uuid} not present in guides.yaml. Adding a new one`, JSON.stringify(guides, null, 2));
  const guidesJsonFile = `${repositoryPath}/generated/json/guides.json`;

  const updatesGuidesArray = [...guidesArray, `${guideFileName}.yaml`];
  const guidesJson = { guides: updatesGuidesArray };
  const contents: string = yaml.dump(guidesJson);

  await writeToFile(guidesYamlFile, contents);

  await writeToFile(
    guidesJsonFile,
    JSON.stringify(
      updatesGuidesArray.map((guideName) => guideName.replace('.yaml', '.json')),
      null,
      2,
    ),
  );

  const guideKeys = await getGuideKeysFromRedis(space.id);
  guideKeys.push(guideFileName);
  await setGuidesArrayForSpaceInRedis(space.id, guideKeys);
}

export async function writeGuideToMainGitRepo(space: Space, gitGuide: GitGuideModel, accountId: string) {
  const allGuidesRepoLocation = `${MAIN_GIT_FOLDER_PATH}/${process.env.ALL_GIT_GUIDES_FOLDER_NAME}`;
  const guidePath = `${allGuidesRepoLocation}/${space.id}/${gitGuide.uuid}.yaml`;
  const writeParams: WriteGuideToRepoParams = {
    gitGuide,
    repositoryPath: allGuidesRepoLocation,
    absoluteGuidePath: guidePath,
    accountId,
    saveGenerated: false,
  };

  await writeGuideToRepo(writeParams);
}

export async function writeGuideToGuidesRepo(space: Space, gitGuide: GitGuideModel, accountId: string): Promise<GitGuideModel> {
  const { repositoryPath } = await getGuideRepoInfo(space);

  const guidesYamlRelativePath = `src/guides.yaml`;
  const guidesYamlFile = `${repositoryPath}/${guidesYamlRelativePath}`;
  const guides: any = yaml.load(fs.readFileSync(guidesYamlFile, 'utf8'));
  const guidesArray: string[] = guides?.guides?.length ? guides?.guides : [];
  const guidePath = `${repositoryPath}/src/${gitGuide.uuid}.yaml`;

  const writeParams: WriteGuideToRepoParams = {
    gitGuide,
    repositoryPath,
    absoluteGuidePath: guidePath,
    accountId,
    saveGenerated: true,
  };

  if (!guidesArray.includes(gitGuide.uuid + '.yaml')) {
    const newGuideFileName = slugify(gitGuide.name + ' ' + space.name);

    writeParams.absoluteGuidePath = `${repositoryPath}/src/${newGuideFileName}.yaml`;

    writeParams.guideFileName = newGuideFileName;
    gitGuide.key = newGuideFileName;
    await appendToSpaceGuides(space, gitGuide, guides, repositoryPath, guidesArray, newGuideFileName, guidesYamlFile);
  } else {
    writeParams.guideFileName = gitGuide.key;
    console.log(`updating in github repo ${gitGuide.uuid}`);
  }

  await writeGuideToRepo(writeParams);

  await setGuideInRedis(space, gitGuide);

  return gitGuide;
}
