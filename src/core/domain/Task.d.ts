export type TaskId = typeof string;

export interface Task {
  id?: TaskId;
  rewardId: string;
  description: string;
  order: number;
}
