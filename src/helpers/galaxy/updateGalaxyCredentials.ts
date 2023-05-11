import { GitCourseSubmissionModel } from '@/deprecatedSchemas/models/course/GitCourseSubmissionModel';
import { GuideModel } from '@/deprecatedSchemas/models/GuideModel';
import { SpaceIntegrationModel } from '@/deprecatedSchemas/models/SpaceIntegrationModel';
import { CourseIntegrations, GuideSubmissionInput } from '@/graphql/generated/graphql';
import { appendToGalaxyCredentials } from '@/helpers/galaxy/appendToGalaxyCredentials';
import { GuideSubmission } from '@prisma/client';

export async function updateGalaxyCredentialsForGuideSubmissionIfApplicable(
  spaceIntegrations: SpaceIntegrationModel | undefined,
  guide: GuideModel,
  guideSubmission: GuideSubmission,
  userAddress: string
): Promise<boolean | undefined> {
  const projectGalaxyToken = spaceIntegrations?.projectGalaxyToken;
  const projectGalaxyCredentialId = guide.guideIntegrations.projectGalaxyCredentialId;
  const galaxyOatPassingCount = guide.guideIntegrations.projectGalaxyOatPassingCount;
  const projectGalaxyPassed = galaxyOatPassingCount && guideSubmission.result.correctQuestions.length >= galaxyOatPassingCount;

  let galaxyCredentialsUpdated: boolean | undefined;

  if (projectGalaxyToken && projectGalaxyCredentialId && projectGalaxyPassed) {
    galaxyCredentialsUpdated = false;
    await appendToGalaxyCredentials(projectGalaxyToken, projectGalaxyCredentialId, userAddress);
    galaxyCredentialsUpdated = true;
  }

  return galaxyCredentialsUpdated;
}

export async function updateGalaxyCredentialsForCourseSubmissionIfApplicable(
  spaceIntegrations: SpaceIntegrationModel | undefined,
  courseIntegrations: CourseIntegrations,
  courseSubmission: GitCourseSubmissionModel,
  userAddress: string
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
    })
  );
  if (projectGalaxyToken && projectGalaxyCredentialId && projectGalaxyPassed) {
    galaxyCredentialsUpdated = false;
    await appendToGalaxyCredentials(projectGalaxyToken, projectGalaxyCredentialId, userAddress);
    galaxyCredentialsUpdated = true;
  }

  return galaxyCredentialsUpdated;
}