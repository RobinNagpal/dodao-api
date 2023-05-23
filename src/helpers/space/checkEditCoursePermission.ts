import { getGitCourseFromRedis } from '@/helpers/course/gitCourseReader';
import { canEditGitSpace } from '@/helpers/space/checkEditSpacePermission';
import { DoDaoJwtTokenPayload } from '@/types/session';
import { Space } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';

export async function checkEditCoursePermission(space: Space, jwt: string, courseKey: string): Promise<JwtPayload & DoDaoJwtTokenPayload> {
  const { decodedJWT, canEditSpace, user } = canEditGitSpace(jwt, space);
  if (!canEditSpace) {
    const course = await getGitCourseFromRedis(space.id, courseKey);

    const isAdminOfCourse = !!course?.courseAdmins?.map((admin) => admin.toLowerCase()).includes(user.toLowerCase());

    if (!isAdminOfCourse) {
      throw new Error(
        'Not allowed to edit course :' +
          JSON.stringify({
            decodedJWT,
            rawCourse: course,
          })
      );
    }
  }

  return decodedJWT;
}
