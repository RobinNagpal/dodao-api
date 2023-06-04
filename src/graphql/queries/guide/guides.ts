import { QueryGuidesArgs } from '@/graphql/generated/graphql';
import { getAllAcademyGuidesForSpace } from '@/helpers/academy/readers/academyGuideReader';

export default async function guides(_: any, args: QueryGuidesArgs) {
  return getAllAcademyGuidesForSpace(args.spaceId);
}
