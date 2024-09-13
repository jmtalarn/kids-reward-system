export type ParticipantId = typeof string;

export interface Participant {
  name: string;
  id?: ParticipantId;
  color?: string;
}
