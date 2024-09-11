
import { useDispatch, useSelector } from "react-redux";
import { addParticipant, removeParticipant } from "../../state/participantsSlice";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faCheck, faTrashXmark } from '@fortawesome/pro-duotone-svg-icons';
import { getRandomColor } from '../../../core/domain/utils/colors'
import TasksList from './TasksList';
import Button from './Button';
import { useState } from 'react';
import { Reward } from '../../../core/domain/Reward';
import Input from './Input';
import style from './Common.module.css';

// const ParticipantInput = ({ participant }: { participant: Participant }) => {
// 	const [inputParticipant, setInputParticipant] = useState(participant);
// 	const dispatch = useDispatch();

// 	return (
// 		<div className={style.field}>
// 			<Input label="Participant" value={inputParticipant.name} onChange={e => setInputParticipant({ ...inputParticipant, name: e.target.value })} placeholder="New participant" />
// 			<Input className={style['color-input']} value={inputParticipant.color} type="color" onChange={e => setInputParticipant({ ...inputParticipant, color: e.target.value })} />
// 			<Button className={style.button} onClick={() => dispatch(addParticipant(inputParticipant))}>
// 				<FontAwesomeIcon icon={faCheck} />
// 			</Button>
// 			<Button className={style.button} onClick={() => dispatch(removeParticipant(participant.id || ''))}>
// 				<FontAwesomeIcon icon={faTrashXmark} />
// 			</Button>
// 		</div>
// 	);
// };


const RewardForm = ({ reward }: { reward: Reward }) => {
	// const { participants } = useSelector((state) => state.participants);
	// const dispatch = useDispatch();
	const [rewardData, setRewardData] = useState(reward);
	console.log({ rewardData })
	return <section className={style.section}>
		<header className={style['section-header']}>
			<h3>Reward</h3>
		</header>
		<div>
			<Input
				label="Description"
				value={rewardData?.description}
				onChange={e => setRewardData({ ...rewardData, description: e.target.value })} placeholder="Reward description"
			/>
			<TasksList rewardId={rewardData?.id} />
			<Input
				label="Due Date"
				value={rewardData?.dueDate}
				onChange={e => setRewardData({ ...rewardData, dueDate: e.target.value })} placeholder="Due Date"
			/>
		</div>
	</section>
}

export default RewardForm;
