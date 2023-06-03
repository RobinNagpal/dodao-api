import { QueryTimelineArgs } from '@/graphql/generated/graphql';
import { AcademyObjectTypes } from '@/helpers/academy/academyObjectTypes';
import { getAcademyObjectFromRedis } from '@/helpers/academy/readers/academyObjectReader';

export default async function timeline(_: any, args: QueryTimelineArgs) {
  return getAcademyObjectFromRedis(args.spaceId, AcademyObjectTypes.timelines, args.timelineId);
}
