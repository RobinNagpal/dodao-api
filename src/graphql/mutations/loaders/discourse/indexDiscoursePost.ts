import { MutationIndexDiscoursePostArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { indexDiscoursePostInDBAndPinecone } from '@/helpers/loaders/discourse/indexDiscoursePostInDBAndPinecone';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { IncomingMessage } from 'http';

export default async function indexDiscoursePost(_: any, args: MutationIndexDiscoursePostArgs, context: IncomingMessage) {
  const space = await getSpaceById(args.spaceId);
  checkEditSpacePermission(space, context);

  await indexDiscoursePostInDBAndPinecone(args.spaceId, args.postId);

  return true;
}
