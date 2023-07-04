import { QueryGuideArgs } from '@/graphql/generated/graphql';
import { getAcademyGuideFromRedis } from '@/helpers/academy/readers/academyGuideReader';

export default async function guide(_: any, args: QueryGuideArgs) {
  return getAcademyGuideFromRedis(args.spaceId, args.uuid);
}
