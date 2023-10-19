import { QueryProjectsArgs } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';

export default function projects(_: any, { type }: QueryProjectsArgs) {
  return type ? prisma.project.findMany({ where: { type: type } }) : prisma.project.findMany();
}
