import { GuideSubmissionResult as GuideSubmissionResultInterface } from '@/types/guide/GuideSubmissionResult';
import { GuidesGitRepository as GuidesGitRepositoryInterface } from '@/types/space/GuidesGitRepository';

declare global {
  namespace PrismaJson {
    // you can use classes, interfaces, types, etc.
    type GuidesGitRepository = GuidesGitRepositoryInterface;
    type GuideSubmissionResult = GuideSubmissionResultInterface;
  }
}
