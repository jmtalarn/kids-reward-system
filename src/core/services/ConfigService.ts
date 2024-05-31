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
      participant.id = window.crypto.randomUUID();
    }
    this.config.participants.push(participant);
  }
  removeParticipant(participantId: string): void {
    this.config.participants = this.config.participants.filter(participant => participant.id !== participantId);
  }
}
