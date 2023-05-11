import fs from 'fs';
import { checkout, log, statusMatrix } from 'isomorphic-git';

// https://github.com/isomorphic-git/isomorphic-git/issues/129#issuecomment-973756911
export async function gitResetHard({ dir, branch }: { dir: string; branch: string }) {
  // Status Matrix Row Indexes
  const FILEPATH = 0;
  const WORKDIR = 2;
  const STAGE = 3;

  // Status Matrix State
  const UNCHANGED = 1;

  const allFiles = await statusMatrix({ dir, fs });
  // Get all files which have been modified or staged - does not include new untracked files or deleted files
  const modifiedFiles = allFiles.filter((row) => row[WORKDIR] > UNCHANGED && row[STAGE] > UNCHANGED).map((row) => row[FILEPATH]);

  // Delete modified/staged files
  await Promise.all(modifiedFiles.map((path) => fs.promises.rm(path)));

  await checkout({ dir, fs, ref: branch, force: true });
}

// copied from https://github.com/isomorphic-git/isomorphic-git/issues/129#issuecomment-390884874
export async function gitReset({ dir, ref, branch }: { dir: string; ref: string; branch: string }) {
  const re = /^HEAD~([0-9]+)$/;
  const m = ref.match(re);
  if (m) {
    const count = +m[1];
    const commits = await log({ fs, dir, depth: count + 1 });
    const commit = commits?.pop()?.oid;
    if (commit) {
      return new Promise((resolve, reject) => {
        fs.writeFile(dir + `/.git/refs/heads/${branch}`, commit, (err) => {
          if (err) {
            return reject(err);
          }
          // clear the index (if any)
          fs.unlink(dir + '/.git/index', (err) => {
            if (err) {
              return reject(err);
            }
            // checkout the branch into the working tree
            checkout({ dir, fs, ref: branch }).then(resolve);
          });
        });
      });
    }
  }
  return Promise.reject(`Wrong ref ${ref}`);
}
