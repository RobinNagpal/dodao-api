import upsertSimulationMutation from '@/graphql/mutations/simulation/upsertSimulationMutation';

export default {
  upsertSimulation: (_: unknown, args: any, context: any) => upsertSimulationMutation(_, args, context),
};
