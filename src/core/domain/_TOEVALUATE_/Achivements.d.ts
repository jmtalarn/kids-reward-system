import { Participant } from '../Participant';
import { Task } from '../Task';


export interface Achievements {
	rewards: Map<number, string>;
	tasks: Map<number, Map<Participant, number>>;
}
