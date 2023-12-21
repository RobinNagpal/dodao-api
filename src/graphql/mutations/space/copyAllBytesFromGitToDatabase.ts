import { VisibilityEnum } from '@/deprecatedSchemas/models/enums';
import { MutationCopyAllBytesFromGitToDatabaseArgs } from '@/graphql/generated/graphql';
import { getBytes } from '@/graphql/queries/byte/bytes';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function copyAllBytesFromGitToDatabase(_: unknown, args: MutationCopyAllBytesFromGitToDatabaseArgs, context: IncomingMessage) {
  const bytes = await getBytes(args.spaceId);
  for (const byte of bytes) {
    await prisma.byte.upsert({
      create: {
        steps: byte.steps,
        id: byte.id,
        spaceId: args.spaceId,

        priority: byte.priority,
        admins: byte.admins,
        name: byte.name,
        content: byte.content,
        created: byte.created,
      },
      update: {
        steps: byte.steps,
        spaceId: args.spaceId,

        priority: byte.priority,
        admins: byte.admins,
        name: byte.name,
        content: byte.content,
        created: byte.created,
      },
      where: {
        id: byte.id,
      },
    });
  }
  return true;
}
