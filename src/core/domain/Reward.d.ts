import { TaskId } from './Task';

export interface Reward {
	id?: TaskId;
	description: string;
	//tasks: Task[];
	dueDate: Date;
	daysToCount: number;
}
