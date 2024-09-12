
import { useDispatch, useSelector } from "react-redux";
import { addParticipant, removeParticipant } from "../../state/participantsSlice";

import { getRandomColor } from '../../../core/domain/utils/colors'

import Button from './Button';
import { useState } from 'react';
import { Participant } from '../../../core/domain/Participant';
import Input from './Input';
import Icon from './Icon';
import style from './Common.module.css';

const ParticipantInput = ({ participant }: { participant: Participant }) => {
	const [inputParticipant, setInputParticipant] = useState(participant);
	const dispatch = useDispatch();

	return (
		<div className={style.field}>
			<Input label="Participant" value={inputParticipant.name} onChange={e => setInputParticipant({ ...inputParticipant, name: e.target.value })} placeholder="New participant" />
			<Input className={style['color-input']} value={inputParticipant.color} type="color" onChange={e => setInputParticipant({ ...inputParticipant, color: e.target.value })} />
			<Button className={style.button} onClick={() => dispatch(addParticipant(inputParticipant))}>
				<Icon icon="check" />
			</Button>
			<Button className={style.button} onClick={() => dispatch(removeParticipant(participant.id || ''))}>
				<Icon icon="trash-2" />
			</Button>
		</div>
	);
};


const ParticipantsList = () => {
	const { participants } = useSelector((state) => state.participants);
	const dispatch = useDispatch();

	return <section className={style.section}>
		<header className={style['section-header']}>
			<h3>Participants</h3>
			<Button onClick={() => dispatch(addParticipant({ name: '', color: getRandomColor() }))}>
				<Icon icon="user-plus" />
			</Button>
		</header>
		{participants.map(participant => (
			<ParticipantInput key={participant.id || 'empty-key'} participant={participant} />
		))}
	</section>
}

export default ParticipantsList;