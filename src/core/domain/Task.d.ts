import { RewardId } from "./Reward";

export type TaskId = typeof string;

export interface Task {
  id?: TaskId;
  rewardId?: RewardId;
  description: string;
  order?: number;
}
