import { PublishStatus } from '@/deprecatedSchemas/models/enums';
import { MutationUpsertProjectByteArgs } from '@/graphql/generated/graphql';
import { PredefinedSpaces } from '@/helpers/chat/utils/app/constants';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { slugify } from '@/helpers/space/slugify';
import { prisma } from '@/prisma';
import { ProjectByte } from '@prisma/client';
import { IncomingMessage } from 'http';

export default async function upsertProjectByte(_: unknown, args: MutationUpsertProjectByteArgs, context: IncomingMessage) {
  const spaceById = await prisma.space.findUniqueOrThrow({ where: { id: PredefinedSpaces.TIDBITS_HUB } });

  checkEditSpacePermission(spaceById, context);

  const savedObject: ProjectByte = await prisma.projectByte.upsert({
    create: {
      ...args.input,
      steps: args.input.steps,
      id: args.input.id || slugify(args.input.name),
      projectId: args.projectId,
      publishStatus: PublishStatus.Live,
      archived: false,
      priority: args.input.priority,
      videoUrl: args.input.videoUrl,
      videoAspectRatio: args.input.videoAspectRatio,
      byteStyle: args.input.byteStyle,
      seoMeta: {
        title: args.input.seoMeta?.title ?? args.input.name,
        description: args.input.seoMeta?.description ?? args.input.content,
        keywords: args.input.seoMeta?.keywords ?? [],
      },
      completionScreen: args.input.completionScreen || undefined,
    },
    update: {
      ...args.input,
      steps: args.input.steps,
      archived: false,
      priority: args.input.priority,
      videoUrl: args.input.videoUrl,
      videoAspectRatio: args.input.videoAspectRatio,
      seoMeta: {
        title: args.input.seoMeta?.title ?? args.input.name,
        description: args.input.seoMeta?.description ?? args.input.content,
        keywords: args.input.seoMeta?.keywords ?? [],
      },
      completionScreen: args.input.completionScreen || undefined,
    },
    where: {
      id: args.input.id,
    },
  });

  return savedObject;
}
