import { Participant } from '../Participant';
import { Task } from '../Task';


export interface Config {
  reward: string;
  participants: Participant[];
  dailyTasks: Task[];
}
