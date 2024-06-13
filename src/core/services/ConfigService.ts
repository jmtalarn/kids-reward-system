import { Config } from '../domain/Config';
import { Participant } from '../domain/Participant';
import { Task } from '../domain/Task';

export class ConfigService {
  private config: Config =
    {
      reward: '',
      participants: [],
      dailyTasks: []
    };

  init(config) {
    this.config = config;
  }

  getConfig(): Config {
    return this.config;
  }

  setReward(reward: string): void {
    this.config.reward = reward;
  }

  addParticipant(participant: Participant): void {
    if (!participant.id) {
      participant.id = window.crypto.randomUUID();
      this.config.participants.push(participant);
    } else {
      this.config.participants = this.config.participants.map(item => {
        if (item.id === participant.id) {
          return participant;
        }
        return item;
      });
    }
  }
  removeParticipant(participantId: string): void {
    this.config.participants = this.config.participants.filter(participant => participant.id !== participantId);
  }

  addTask(task: Task): void {
    const orderLastItem = this.config.dailyTasks.length ? this.config.dailyTasks[this.config.dailyTasks.length - 1].order + 1 : 0;
    if (!task.id) {
      task.id = window.crypto.randomUUID();
      task.order = orderLastItem;
      this.config.dailyTasks.push(task);
    } else {
      this.config.dailyTasks = this.config.dailyTasks.map(item => {
        if (item.id === task.id) {
          return task;
        }
        return item;
      });
    }
  }

  removeTask(taskId: string): void {
    this.config.dailyTasks = this.config.dailyTasks.filter(task => task.id !== taskId);
  }
  reorderTask({ id, order }: { id: string, order: number }): void {
    const currentIndex = this.config.dailyTasks.findIndex(task => task.id === id);
    const task = this.config.dailyTasks.find(task => task.id === id);

    const dailyTasksUpdated = [... this.config.dailyTasks];
    dailyTasksUpdated.splice(currentIndex, 1);
    dailyTasksUpdated.splice(order, 0, task);

    this.config.dailyTasks = dailyTasksUpdated.map((task, idx) => ({ ...task, order: idx }))

  }
}
