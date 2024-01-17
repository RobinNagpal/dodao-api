import { PublishStatus } from '@/deprecatedSchemas/models/enums';
import { MutationUpsertProjectByteArgs } from '@/graphql/generated/graphql';
import { TOP_CRYPTO_PROJECTS_SPACE_ID } from '@/helpers/chat/utils/app/constants';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { slugify } from '@/helpers/space/slugify';
import { prisma } from '@/prisma';
import { ProjectByte } from '@prisma/client';
import { IncomingMessage } from 'http';

export default async function upsertProjectByte(_: unknown, args: MutationUpsertProjectByteArgs, context: IncomingMessage) {
  const spaceById = await prisma.space.findUniqueOrThrow({ where: { id: TOP_CRYPTO_PROJECTS_SPACE_ID } });

  checkEditSpacePermission(spaceById, context);

  const savedObject: ProjectByte = await prisma.projectByte.upsert({
    create: {
      ...args.input,
      steps: args.input.steps,
      id: args.input.id || slugify(args.input.name),
      projectId: args.projectId,
      publishStatus: PublishStatus.Live,
      archived: false,
      seoMata: {
        title: args.input.seoMeta?.title ?? args.input.name,
        description: args.input.seoMeta?.description ?? args.input.content,
        keywords: args.input.seoMeta?.keywords ?? [],
      },
    },
    update: {
      ...args.input,
      steps: args.input.steps,
      archived: false,
      seoMata: {
        title: args.input.seoMeta?.title ?? args.input.name,
        description: args.input.seoMeta?.description ?? args.input.content,
        keywords: args.input.seoMeta?.keywords ?? [],
      },
    },
    where: {
      id: args.input.id,
    },
  });

  return savedObject;
}
