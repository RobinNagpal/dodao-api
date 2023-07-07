import { ByteStep as GraphqlByteStep } from '@/graphql/generated/graphql';
import { AuthSettings as SpaceAuthSettings, GuideSettings as SpaceGuideSettings, SocialSettings as SpaceSocialSettings } from '@/graphql/generated/graphql';
import { ByteLinkedinPdfContent as ByteLinkedinPdfContentType } from '@/graphql/generated/graphql';
import { TempTopicSubmissionModel as TempTopicSubmissionModelInterface } from '@/types/course/submission';
import { GuideSubmissionResult as GuideSubmissionResultInterface } from '@/types/guide/GuideSubmissionResult';
import { GuidesGitRepository as GuidesGitRepositoryInterface } from '@/types/space/GuidesGitRepository';
import { SpaceInviteLinks as SpaceInviteLinksInterface } from '@/types/space/SpaceInviteLinks';

declare global {
  namespace PrismaJson {
    // you can use classes, interfaces, types, etc.
    type GuidesGitRepository = GuidesGitRepositoryInterface;
    type GuideSubmissionResult = GuideSubmissionResultInterface;
    type SpaceInviteLinks = SpaceInviteLinksInterface;
    type TempTopicSubmissionModel = TempTopicSubmissionModelInterface;
    type ByteStep = GraphqlByteStep;
    type AuthSettings = SpaceAuthSettings;
    type GuideSettings = SpaceGuideSettings;
    type SocialSettings = SpaceSocialSettings;
    type ByteLinkedinPdfContent = ByteLinkedinPdfContentType;
  }
}
