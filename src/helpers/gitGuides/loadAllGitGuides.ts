import { loadAllGuidesForSpace } from '@/helpers/gitGuides/gitGuideReader';
import { prisma } from '@/prisma';

export async function loadAllGitGuides() {
  const spaceIntegrationModels = await prisma.spaceIntegration.findMany({ where: { gitGuideRepositories: { isEmpty: false } } });

  for (const spaceIntegration of spaceIntegrationModels) {
    console.log('load guides for ', spaceIntegration.spaceId);
    await loadAllGuidesForSpace(spaceIntegration.spaceId, spaceIntegration);
    // Add some sleep to allow other threads to run
    await new Promise((r) => setTimeout(r, 2000));
    console.log('guides loaded for ', spaceIntegration.spaceId);
  }
}
