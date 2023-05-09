import { PrismaClient, Space } from '@prisma/client';
import { JsonObject } from 'langchain/tools';

const prisma = new PrismaClient();

async function main() {
  const spaceData: Space[] = await prisma.space.findMany({});
  for (const space of spaceData) {
    const settings = (space.settings || {}) as JsonObject;
    console.log(`Updating space: ${space.id}`);
    const data = {
      ...space,
      settings: settings || {},
      admins: (settings.admins as string[]) || [],
      name: (settings.name as string) || space.name,
      skin: (settings.name as string) || space.skin,
      about: (settings.name as string) || space.about,
      avatar: (settings.name as string) || space.avatar,
      creator: (settings.name as string) || space.creator,
      members: (settings.name as string[]) || space.members,
      mission: (settings.name as string) || space.mission,
      network: (settings.name as string) || space.network,
      twitter: (settings.name as string) || space.twitter,
      blockchain: (settings.name as string) || space.blockchain,
      categories: (settings.name as string[]) || space.categories,
      features: space.features || [],
      inviteLinks: space.inviteLinks || [],
    } as any;
    const result = await prisma.space.update({
      where: { id: space.id },
      data: data,
    });
    console.log(`Inserted space: ${result.name}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
