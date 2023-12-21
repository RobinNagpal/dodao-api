import { getBytes } from '@/graphql/queries/byte/bytes';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function copyAllBytesFromGitToDatabase(_: unknown, args: unknown, context: IncomingMessage) {
  const spaces = await prisma.space.findMany();

  for (const space of spaces) {
    const bytes = await getBytes(space.id);
    for (const byte of bytes) {
      await prisma.byte.upsert({
        create: {
          steps: byte.steps,
          id: byte.id,
          spaceId: space.id,
          priority: byte.priority,
          admins: byte.admins,
          name: byte.name,
          content: byte.content,
          created: byte.created,
        },
        update: {
          steps: byte.steps,
          spaceId: space.id,

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
  }
  return true;
}
