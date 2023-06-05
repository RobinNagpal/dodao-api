import { QueryGuideArgs, QueryGuidesArgs } from '@/graphql/generated/graphql';
import { getAcademyGuideFromRedis, getAllAcademyGuidesForSpace } from '@/helpers/academy/readers/academyGuideReader';

export default async function guide(_: any, args: QueryGuideArgs) {
  return getAcademyGuideFromRedis(args.spaceId, args.uuid);
}
