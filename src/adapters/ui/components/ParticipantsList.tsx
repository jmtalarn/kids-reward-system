import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addParticipant, removeParticipant, fetchParticipants } from "../../state/participantsSlice";
import { Check, Trash2, UserPlus } from 'react-feather';
import { getRandomColor } from '../../../core/domain/utils/colors';
import { RootState, AppDispatch } from '../../state/store';
import Button from './Button';
import { Participant, ParticipantId } from '../../../core/domain/Participant';
import Input from './Input';
import style from './Common.module.css';

const ParticipantInput = ({ participant }: { participant: Participant }) => {
	const [inputParticipant, setInputParticipant] = useState(participant);
	const dispatch = useDispatch<AppDispatch>();

	return (
		<div className={style.field}>
			<Input
				label="Participant"
				fieldStyle={{ flexGrow: "1" }}
				style={{ width: "80%" }}
				value={inputParticipant.name}
				onChange={e => setInputParticipant({ ...inputParticipant, name: e.target.value })}
				placeholder="New participant"
			/>
			<Input className={style['color-input']} value={inputParticipant.color} type="color" onChange={e => setInputParticipant({ ...inputParticipant, color: e.target.value })} />
			<Button className={style.button} onClick={() => dispatch(addParticipant(inputParticipant))}>
				<Check />
			</Button>
			<Button className={style.button} onClick={() => dispatch(removeParticipant(participant.id || ''))}>
				<Trash2 />
			</Button>
		</div>
	);
};


const ParticipantsList = () => {
	const { participants } = useSelector((state: RootState) => state.participants);
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(fetchParticipants());
	}, []);
	return <section className={style.section}>
		<header className={style['section-header']}>
			<h3>Participants</h3>
			<Button onClick={() => dispatch(addParticipant({ name: '', color: getRandomColor() }))}>
				<UserPlus />
			</Button>
		</header>
		{participants.allIds.map((id: ParticipantId) => participants.byId[id]).map((participant: Participant) => (
			<ParticipantInput key={participant.id || 'empty-key'} participant={participant} />
		))}
	</section>;
};

export default ParticipantsList;
