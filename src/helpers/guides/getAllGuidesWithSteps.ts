import { PublishStatus } from '@/deprecatedSchemas/models/enums';
import { GuideModel, GuideSource } from '@/deprecatedSchemas/models/GuideModel';
import { getAllAcademyGuidesForSpace } from '@/helpers/academy/readers/academyGuideReader';

export async function getAllGuidesWithSteps(spaceId: string, publishStatuses: PublishStatus[] = [PublishStatus.Live]) {
  const academyGuides: GuideModel[] = (await getAllAcademyGuidesForSpace(spaceId)) || [];

  return [
    ...academyGuides.filter((guide) => publishStatuses.includes(guide.publishStatus)).map((gitGuide) => ({ ...gitGuide, guideSource: GuideSource.Academy })),
  ];
}
