import { QueryBytesArgs } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';

export async function getBytes(spaceId: string) {
  return prisma.byte.findMany({ where: { spaceId: spaceId } });
}

export default async function bytes(_: any, args: QueryBytesArgs) {
  return getBytes(args.spaceId);
}
