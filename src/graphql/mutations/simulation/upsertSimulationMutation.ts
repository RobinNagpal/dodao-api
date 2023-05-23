import { PublishStatus } from '@/deprecatedSchemas/models/enums';
import { SimulationModel } from '@/deprecatedSchemas/models/simulation/SimulationModel';
import { MutationUpsertSimulationArgs, UpsertSimulationInput } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { AcademyObjectTypes } from '@/helpers/academy/academyObjectTypes';
import { writeObjectToAcademyRepo } from '@/helpers/academy/writers/academyObjectWriter';
import { logError } from '@/helpers/adapters/errorLogger';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { slugify } from '@/helpers/space/slugify';
import { IncomingMessage } from 'http';

async function transformInput(spaceId: string, message: UpsertSimulationInput): Promise<SimulationModel> {
  // remove the order and add id if needed
  const simulationModel: SimulationModel = {
    ...message,
    id: message.id || slugify(message.name),
    publishStatus: message.publishStatus as PublishStatus,
    steps: message.steps.map((s, i) => ({
      ...s,
      iframeUrl: s.iframeUrl || undefined,
      order: undefined,
      content: s.content,
    })),
  };
  return simulationModel;
}

export default async function upsertSimulationMutation(_: unknown, { spaceId, input }: MutationUpsertSimulationArgs, context: IncomingMessage) {
  try {
    const spaceById = await getSpaceById(spaceId);
    if (!spaceById) throw new Error(`No space found: ${spaceId}`);

    const decodedJwt = checkEditSpacePermission(spaceById, context.headers?.authorization?.replace('Bearer ', '') || '');
    const transformedGuide = await transformInput(spaceId, input);

    const upsertedObject = await writeObjectToAcademyRepo(spaceById, transformedGuide, AcademyObjectTypes.simulations, decodedJwt.accountId);

    return upsertedObject;
  } catch (e) {
    await logError((e as any)?.response?.data || 'Error in upsertSimulation', {}, e as any, null, null);
    throw e;
  }
}
