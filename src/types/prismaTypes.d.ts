import { TempTopicSubmissionModel as TempTopicSubmissionModelInterface } from '@/types/course/submission';
import { GuideSubmissionResult as GuideSubmissionResultInterface } from '@/types/guide/GuideSubmissionResult';
import { GuidesGitRepository as GuidesGitRepositoryInterface } from '@/types/space/GuidesGitRepository';
import { SpaceInviteLinks as SpaceInviteLinksInterface } from '@/types/space/SpaceInviteLinks';
import { ByteStep as ByteStepInterface } from '@/types/bytes/ByteStep';

declare global {
  namespace PrismaJson {
    // you can use classes, interfaces, types, etc.
    type GuidesGitRepository = GuidesGitRepositoryInterface;
    type GuideSubmissionResult = GuideSubmissionResultInterface;
    type SpaceInviteLinks = SpaceInviteLinksInterface;
    type TempTopicSubmissionModel = TempTopicSubmissionModelInterface;
    type ByteStep = ByteStepInterface;
  }
}
