import { QueryBytesArgs } from '@/graphql/generated/graphql';
import { AcademyObjectTypes } from '@/helpers/academy/academyObjectTypes';
import { getAllAcademyObjectsForSpace } from '@/helpers/academy/readers/academyObjectReader';

export default async function bytes(_: any, args: QueryBytesArgs) {
  return getAllAcademyObjectsForSpace(args.spaceId, AcademyObjectTypes.bytes);
}
