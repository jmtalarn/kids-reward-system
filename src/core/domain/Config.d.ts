import { Participant } from './Participant';
import { Task } from './Task';
// export const systemTypes = {
//   Flow: "Flow",
//   Daily: "Daily",
//   Weekly: "Weekly",
//   Monthly: "Monthly"
// } as const;

// export type SystemType = typeof systemTypes;

// // type SystemTypeKey = keyof SystemType;

// // type SystemTypeValue = (typeof systemTypes)[SystemTypeKey];

export interface Config {
  reward: string;
  participants: Participant[];
  dailyTasks: Task[];
}
