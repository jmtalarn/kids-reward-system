import { Data } from '../../domain/_TOEVALUATE_/Data';
import { Participant } from '../../domain/Participant';
import { Task } from '../../domain/Task';



export class DataService {
  private data: Data =
    {
      assessments: null,
      rewards: null,
    };

  init(data) {
    console.log("init data", { data })
    this.data = data;
  }

  getData(): Data {
    return this.data;
  }

  addReward({ date, participant, reward }: { date: Date, participant: Participant, reward: string }): void {
    this.rewards[date][participant.id] = { ...participant, reward };
  }
  removeReward({ date, participant }: { date: Date, participant: Participant }): void {
    delete this.rewards[date][participant.id];
  }

  addAssessment({ date, participant, task, option }: { date: Date, participant: Participant, task: Task, option: DialogOption }): void {
    this.assessment[date][participant.id] =
    {
      ...participant,
      tasks: {
        ...this.assessment[date][participant.id].tasks,
        [task.id]: { ...task, assessment: option }
      }
    };
  }
  removeAssessment({ date, participant, task }: { date: Date, participant: Participant, task: Task }): void {
    delete this.assessment[date][participant.id].tasks[task.id];
  }
}
