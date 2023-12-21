import { PublishStatus } from '@/deprecatedSchemas/models/enums';
import { Byte, QueryBytesArgs } from '@/graphql/generated/graphql';
import { AcademyObjectTypes } from '@/helpers/academy/academyObjectTypes';
import { getAllAcademyObjectsForSpace } from '@/helpers/academy/readers/academyObjectReader';
import { prisma } from '@/prisma';

export async function getBytes(spaceId: string) {
  const bytesInRedis = (await getAllAcademyObjectsForSpace(spaceId, AcademyObjectTypes.bytes)) as Byte[];
  const dbBytes = await prisma.byte.findMany({ where: { spaceId: spaceId } });

  // replace bytes in redis with draft bytes
  const combinedBytes = bytesInRedis.map((byte) => {
    const dbByte = dbBytes.find((draftByte) => draftByte.id === byte.id);
    return dbByte ? dbByte : byte;
  });

  // include bytes in DB that are not in Redis
  const onlyInDBBytes = dbBytes.filter((dbByte) => !bytesInRedis.find((redisByte) => redisByte.id === dbByte.id));

  return [...combinedBytes, ...onlyInDBBytes];
}

export default async function bytes(_: any, args: QueryBytesArgs) {
  return getBytes(args.spaceId);
}
