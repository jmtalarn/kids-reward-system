import { TaskId } from './Task';

export interface Reward {
	id?: TaskId;
	description: string;
	//tasks: Task[];
	dueDate: string;
	daysToCount: number;
	startingDate: string;
}
