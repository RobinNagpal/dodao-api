import { ensureDirectoryExistence } from '@/helpers/git/ensureDirectoryExistence';
import { MAIN_GIT_FOLDER_PATH } from '@/helpers/git/gitConstants';
import { prisma } from '@/prisma';
import { Space } from '@prisma/client';
import fs from 'fs';
import { clone, listRemotes } from 'isomorphic-git';
import http from 'isomorphic-git/http/node';

export async function getGuideRepoInfo(space: Space) {
  const spaceIntegration = await prisma.spaceIntegration.findUnique({ where: { spaceId: space.id } });
  const gitGuideRepositories = spaceIntegration?.gitGuideRepositories;
  const guideRepositoryUrl: string | undefined = gitGuideRepositories?.length && gitGuideRepositories?.[0] ? gitGuideRepositories[0].repoUrl : undefined;

  if (!guideRepositoryUrl) {
    throw new Error('No git repository integration added');
  }

  const repositoryFolderName = guideRepositoryUrl.split('/').pop();
  const parentDirectory = `${MAIN_GIT_FOLDER_PATH}/dodao-guide-repos/${space.id}`;
  const repositoryPath = `${parentDirectory}/${repositoryFolderName}`;

  return {
    guideRepositoryUrl,
    repositoryFolderName,
    parentDirectory,
    repositoryPath,
  };
}

export async function ensureGuideRepositoryIsAlreadyCloned(space: Space) {
  const { guideRepositoryUrl, parentDirectory, repositoryPath } = await getGuideRepoInfo(space);
  ensureDirectoryExistence(parentDirectory);

  if (!fs.existsSync(repositoryPath)) {
    await clone({
      fs,
      http,
      dir: repositoryPath,
      url: guideRepositoryUrl,
    });
  }

  const remotes = await listRemotes({ fs, dir: repositoryPath });

  if (remotes.pop()?.url !== guideRepositoryUrl) {
    throw new Error('Not the same repo');
  }
}

export const getRedisKeyForGuide = (spaceId: string, guideKey: string): string => `${spaceId}__${guideKey}`;
export const getRedisKeyForSpaceGuidesArray = (spaceId: string): string => `all_guides_${spaceId}`;
