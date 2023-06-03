import { QuerySimulationsArgs } from '@/graphql/generated/graphql';
import { AcademyObjectTypes } from '@/helpers/academy/academyObjectTypes';
import { getAllAcademyObjectsForSpace } from '@/helpers/academy/readers/academyObjectReader';

export default async function timelines(_: any, args: QuerySimulationsArgs) {
  return getAllAcademyObjectsForSpace(args.spaceId, AcademyObjectTypes.timelines);
}
