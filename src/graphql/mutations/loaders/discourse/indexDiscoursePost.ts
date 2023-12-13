import { MutationIndexDiscoursePostArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { scrapeAndIndexDiscoursePost } from '@/helpers/loaders/discourse/scrapeAndIndexDiscoursePost';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { IncomingMessage } from 'http';

export default async function indexDiscoursePost(_: any, args: MutationIndexDiscoursePostArgs, context: IncomingMessage) {
  const space = await getSpaceById(args.spaceId);
  checkEditSpacePermission(space, context);

  await scrapeAndIndexDiscoursePost(args.spaceId, args.postId);

  return true;
}
