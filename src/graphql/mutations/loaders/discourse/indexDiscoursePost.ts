import { MutationIndexDiscoursePostArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { indexDiscoursePostInDB } from '@/helpers/loaders/discourse/indexDiscoursePostInDB';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { IncomingMessage } from 'http';

export default async function indexDiscoursePost(_: any, args: MutationIndexDiscoursePostArgs, context: IncomingMessage) {
  const space = await getSpaceById(args.spaceId);
  checkEditSpacePermission(space, context);

  await indexDiscoursePostInDB(args.spaceId, args.postId);

  return true;
}
