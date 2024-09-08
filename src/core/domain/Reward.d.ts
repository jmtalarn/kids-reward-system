import { Task } from './Task';

export interface Reward {
	id?: string;
	description: string;
	tasks: Task[];
	dueDate: Date;
	daysToCount: number;
}
