import { GnosisSafeWallet } from '@/types/space/GnosisSafeWallet';
import { GuidesGitRepository } from '@/types/space/GuidesGitRepository';

export interface SpaceIntegrationModel {
  id: string;
  spaceId: string;
  academyRepository?: string;
  discordGuildId?: string;
  gitGuideRepositories: GuidesGitRepository[];
  gnosisSafeWallets?: GnosisSafeWallet[];
  projectGalaxyToken?: string;
  projectGalaxyTokenLastFour?: string;
  updatedAt: number;
  updatedBy: string;
}
