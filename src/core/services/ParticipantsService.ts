import { Participant } from '../domain/Participant';

import participantsRepository from '../../infrastructure/repositories/participants/localStorage';

const getAllParticipants = async (): Promise<Participant[]> => {
	return participantsRepository.getAllParticipants();
};

const addParticipant = async (participant: Participant): Promise<Participant[]> => {
	return participantsRepository.addParticipant(participant);
};

const removeParticipant = async (participantId: string): Promise<Participant[]> => {
	return participantsRepository.removeParticipant(participantId);
}

export default {
	getAllParticipants,
	addParticipant,
	removeParticipant
};

