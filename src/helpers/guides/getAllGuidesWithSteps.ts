import { PublishStatus } from '@/deprecatedSchemas/models/enums';
import { GuideModel, GuideSource } from '@/deprecatedSchemas/models/GuideModel';
import { getAllGitGuidesForSpace } from '@/helpers/gitGuides/gitGuideReader';
import { getAllAcademyGuidesForSpace } from '@/helpers/academy/readers/academyGuideReader';

export async function getAllGuidesWithSteps(spaceId: string, publishStatuses: PublishStatus[] = [PublishStatus.Live]) {
  const gitGuides: GuideModel[] = (await getAllGitGuidesForSpace(spaceId)) || [];
  const academyGuides: GuideModel[] = (await getAllAcademyGuidesForSpace(spaceId)) || [];

  return [
    ...gitGuides.filter((guide) => publishStatuses.includes(guide.publishStatus)).map((gitGuide) => ({ ...gitGuide, guideSource: GuideSource.Git })),
    ...academyGuides.filter((guide) => publishStatuses.includes(guide.publishStatus)).map((gitGuide) => ({ ...gitGuide, guideSource: GuideSource.Academy })),
  ];
}
