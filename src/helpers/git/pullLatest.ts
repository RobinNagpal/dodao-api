import { getAuthor } from '@/helpers/getAuthor';
import { gitResetHard } from '@/helpers/git/gitResetHard';
import { Space } from '@prisma/client';
import fs from 'fs';
import { fastForward, pull } from 'isomorphic-git';
import http from 'isomorphic-git/http/node';

export async function pullLatest(space: Space, repositoryPath: string) {
  try {
    await gitResetHard({ dir: repositoryPath, branch: 'main' });
    await pull({
      fs,
      http,
      dir: repositoryPath,
      ref: 'main',
      author: getAuthor(space.creator),
    });

    await fastForward({
      fs,
      http,
      dir: repositoryPath,
      ref: 'main',
      singleBranch: true,
    });
  } catch (e) {
    console.error(e);
  }
}
