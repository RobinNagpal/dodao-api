import { PrismaClient, Space } from '@prisma/client';
import { JsonObject } from 'langchain/tools';

const prisma = new PrismaClient();

async function main() {
  const spaceData: Space[] = await prisma.space.findMany({});
  for (const space of spaceData) {
    const settings = (space.settings || {}) as JsonObject;
    console.log(`Updating space: ${space.id} ${settings.avatar}`);
    const result = await prisma.space.update({
      where: { id: space.id },
      data: {
        ...space,
        settings: settings || {},
        admins: settings.admins || [],
        name: settings.name || space.name,
        skin: settings.skin || space.skin,
        avatar: settings.avatar || space.avatar,
        creator: settings.creator || space.creator,
        features: space.features || [],
      } as any,
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
