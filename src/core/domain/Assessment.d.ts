import { Task } from './Task';
import { Participant } from './Participant';
import { DialogOption } from './DialogOption';

export interface Assessment {
	id?: string;
	date: Date;
	participant: Participant
	task: Task;
	score: DialogOption;
}
