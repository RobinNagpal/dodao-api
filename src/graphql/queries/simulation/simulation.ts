import { QuerySimulationArgs } from '@/graphql/generated/graphql';
import { AcademyObjectTypes } from '@/helpers/academy/academyObjectTypes';
import { getAcademyObjectFromRedis } from '@/helpers/academy/readers/academyObjectReader';

export default async function simulation(_: any, args: QuerySimulationArgs) {
  return getAcademyObjectFromRedis(args.spaceId, AcademyObjectTypes.simulations, args.simulationId);
}
