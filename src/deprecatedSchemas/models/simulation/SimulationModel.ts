import { PublishStatus } from './../enums';

export interface SimulationStep {
  content: string;
  uuid: string;
  name: string;
  iframeUrl?: string;
}

export interface SimulationModel {
  id: string;
  content: string;
  created: string;
  name: string;
  publishStatus: PublishStatus;
  steps: SimulationStep[];
  admins: string[];
  tags: string[];
  priority: number;
}
