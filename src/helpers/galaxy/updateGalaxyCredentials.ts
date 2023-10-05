import { GuideModel } from '@/deprecatedSchemas/models/GuideModel';
import { SpaceIntegrationModel } from '@/deprecatedSchemas/models/SpaceIntegrationModel';
import { appendToGalaxyCredentials } from '@/helpers/galaxy/appendToGalaxyCredentials';
import { CourseIntegration, GitCourseSubmission, GuideSubmission, SpaceIntegration } from '@prisma/client';

export async function updateGalaxyCredentialsForGuideSubmissionIfApplicable(
  spaceIntegrations: SpaceIntegration | undefined | null,
  guide: GuideModel,
  guideSubmission: GuideSubmission,
  userAddress: string,
): Promise<boolean | undefined> {
  const projectGalaxyToken = spaceIntegrations?.projectGalaxyToken;
  const projectGalaxyCredentialId = guide.guideIntegrations.projectGalaxyCredentialId;
  const galaxyOatPassingCount = guide.guideIntegrations.projectGalaxyOatPassingCount;
  const projectGalaxyPassed = galaxyOatPassingCount && guideSubmission.result.correctQuestions.length >= galaxyOatPassingCount;

  let galaxyCredentialsUpdated: boolean | undefined;

  if (projectGalaxyToken && projectGalaxyCredentialId && projectGalaxyPassed) {
    galaxyCredentialsUpdated = false;
    console.log('Updating galaxy credentials for guide submission', JSON.stringify({ projectGalaxyCredentialId, userAddress }));
    await appendToGalaxyCredentials(projectGalaxyToken, projectGalaxyCredentialId, userAddress);
    galaxyCredentialsUpdated = true;
  } else {
    console.log(
      'No galaxy update needed - ',
      JSON.stringify({ projectGalaxyToken, projectGalaxyCredentialId, galaxyOatPassingCount, projectGalaxyPassed, galaxyCredentialsUpdated }),
    );
  }

  return galaxyCredentialsUpdated;
}

export async function updateGalaxyCredentialsForCourseSubmissionIfApplicable(
  spaceIntegrations: SpaceIntegration | null,
  courseIntegrations: CourseIntegration,
  courseSubmission: GitCourseSubmission,
  userAddress: string,
): Promise<boolean | undefined> {
  const projectGalaxyToken = spaceIntegrations?.projectGalaxyToken;
  const projectGalaxyCredentialId = courseIntegrations.projectGalaxyCredentialId;
  const galaxyOatPassingCount = courseIntegrations.projectGalaxyOatPassingCount;
  const projectGalaxyPassed = galaxyOatPassingCount && courseSubmission.questionsCorrect && courseSubmission.questionsCorrect >= galaxyOatPassingCount;

  let galaxyCredentialsUpdated: boolean | undefined;

  console.log(
    'galaxy submission - ',
    JSON.stringify({
      projectGalaxyToken,
      projectGalaxyCredentialId,
      galaxyOatPassingCount,
      projectGalaxyPassed,
    }),
  );
  if (projectGalaxyToken && projectGalaxyCredentialId && projectGalaxyPassed) {
    galaxyCredentialsUpdated = false;
    await appendToGalaxyCredentials(projectGalaxyToken, projectGalaxyCredentialId, userAddress);
    galaxyCredentialsUpdated = true;
  }

  return galaxyCredentialsUpdated;
}
