import { MutationAnnotateDiscoursePostArgs, MutationUpsertSummaryOfDiscoursePostArgs, UpsertSummaryOfDiscoursePostInput } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { indexDiscoursePostInDBAndPinecone } from '@/helpers/loaders/discourse/indexDiscoursePostInDBAndPinecone';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function upsertSummaryOfDiscoursePost(_: any, args: MutationUpsertSummaryOfDiscoursePostArgs, context: IncomingMessage) {
  const space = await getSpaceById(args.spaceId);
  checkEditSpacePermission(space, context);

  const updatedPost = await prisma.discoursePost.update({
    where: {
      id: args.input.postId,
    },
    data: {
      aiSummary: args.input.aiSummary,
      aiSummaryDate: args.input.aiSummaryDate,
    },
  });

  indexDiscoursePostInDBAndPinecone(args.spaceId, updatedPost.id);
  return updatedPost;
}
