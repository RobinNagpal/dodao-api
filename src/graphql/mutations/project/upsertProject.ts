import { MutationUpsertProjectArgs } from '@/graphql/generated/graphql';
import { TOP_CRYPTO_PROJECTS_SPACE_ID } from '@/helpers/chat/utils/app/constants';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function upsertProject(parent: any, args: MutationUpsertProjectArgs, context: IncomingMessage) {
  const spaceById = await prisma.space.findUniqueOrThrow({ where: { id: TOP_CRYPTO_PROJECTS_SPACE_ID } });

  const decodedJwt = checkEditSpacePermission(spaceById, context);

  const upsertedProject = await prisma.project.upsert({
    create: {
      id: args.input.id,
      createdAt: new Date(),
      creator: decodedJwt.username,
      name: args.input.name,
      details: args.input.details,
      excerpt: args.input.excerpt,
      type: args.input.type,
      updatedAt: new Date(),
      logo: args.input.logo,
      admins: args.input.admins,
      adminUsernames: args.input.adminUsernames,
      adminUsernamesV1: args.input.adminUsernamesV1,
      website: args.input.website,
      docs: args.input.docs,
      discord: args.input.discord,
      telegram: args.input.telegram,
      github: args.input.github,
      cardThumbnail: args.input.cardThumbnail,
      archived: false,
      priority: args.input.priority,
      seoMeta: {
        title: args.input.seoMeta?.title ?? args.input.name,
        description: args.input.seoMeta?.description ?? args.input.excerpt,
        keywords: args.input.seoMeta?.keywords ?? [],
      },
    },
    update: {
      createdAt: new Date(),
      creator: decodedJwt.username,
      name: args.input.name,
      details: args.input.details,
      excerpt: args.input.excerpt,
      type: args.input.type,
      updatedAt: new Date(),
      logo: args.input.logo,
      admins: args.input.admins,
      adminUsernames: args.input.adminUsernames,
      adminUsernamesV1: args.input.adminUsernamesV1,
      website: args.input.website,
      docs: args.input.docs,
      discord: args.input.discord,
      telegram: args.input.telegram,
      github: args.input.github,
      cardThumbnail: args.input.cardThumbnail,
      priority: args.input.priority,
      seoMeta: {
        title: args.input.seoMeta?.title ?? args.input.name,
        description: args.input.seoMeta?.description ?? args.input.excerpt,
        keywords: args.input.seoMeta?.keywords ?? [],
      },
    },
    where: {
      id: args.input.id,
    },
  });

  return upsertedProject;
}
