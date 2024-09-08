import { Participant } from '../domain/Participant';
const LOCAL_STORAGE_KEY = 'KRS_PARTICIPANTS';

const getAllParticipants = async (): Promise<Participant[]> => {
	const participants = localStorage.getItem(LOCAL_STORAGE_KEY);
	return participants ? JSON.parse(participants) : [];
};

const addParticipant = async (participant: Participant): Promise<Participant[]> => {
	const participants = await getAllParticipants();
	let updatedParticipants;
	if (!participant.color) { participant.color = getRandomColor() }
	if (!participant.id) {
		participant.id = window.crypto.randomUUID();
		updatedParticipants = [...participants, participant];
	} else {
		updatedParticipants = participants.map(item => {
			if (item.id === participant.id) {
				return participant;
			}
			return item;
		});
	}
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedParticipants));
	return updatedParticipants;
};

const removeParticipant = async (participantId: string): Promise<Participant[]> => {
	const participants = await getAllParticipants();
	const updatedParticipants = participants.filter(participant => participant.id !== participantId);
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedParticipants));
	return updatedParticipants;
};

export default {
	getAllParticipants,
	addParticipant,
	removeParticipant
};
