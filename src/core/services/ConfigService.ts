import { Config } from '../domain/Config';
import { Participant } from '../domain/Participant';

export class ConfigService {
  private config: Config = { reward: '', participants: [] };

  getConfig(): Config {
    return this.config;
  }

  setReward(reward: string): void {
    this.config.reward = reward;
  }

  addParticipant(participant: Participant): void {
    if (!participant.id) {
      console.log('NEW ONE', participant);
      participant.id = window.crypto.randomUUID();
      this.config.participants.push(participant);
    } else {
      this.config.participants = this.config.participants.map(item => {
        if (item.id === participant.id) {
          console.log('EDIT IT', participant);
          return participant;
        }
        return item;
      });
    }
  }
  removeParticipant(participantId: string): void {
    this.config.participants = this.config.participants.filter(participant => participant.id !== participantId);
  }
}
