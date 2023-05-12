import { QueryByteArgs } from '@/graphql/generated/graphql';
import { AcademyObjectTypes } from '@/helpers/academy/academyObjectTypes';
import { getAcademyObjectFromRedis } from '@/helpers/academy/readers/academyObjectReader';

export default async function byte(_: any, args: QueryByteArgs) {
  return getAcademyObjectFromRedis(args.spaceId, AcademyObjectTypes.bytes, args.byteId);
}
