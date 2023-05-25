import { TimelineModel } from '@/deprecatedSchemas/models/timeline/TimelineModel';
import { MutationUpsertTimelineArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { AcademyObjectTypes } from '@/helpers/academy/academyObjectTypes';
import { writeObjectToAcademyRepo } from '@/helpers/academy/writers/academyObjectWriter';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { slugify } from '@/helpers/space/slugify';
import { IncomingMessage } from 'http';

export default async function upsertTimelineMutation(_: unknown, args: MutationUpsertTimelineArgs, context: IncomingMessage) {
  const spaceById = await getSpaceById(args.spaceId);

  const decodedJwt = checkEditSpacePermission(spaceById, context);

  const timelineInput = args.input;

  const timelineObject: TimelineModel = {
    ...timelineInput,
    id: timelineInput.id || slugify(timelineInput.name),
    thumbnail: timelineInput.thumbnail || undefined,
  };
  const upsertedObject = await writeObjectToAcademyRepo(spaceById, timelineObject, AcademyObjectTypes.timelines, decodedJwt.accountId);
  return upsertedObject;
}
