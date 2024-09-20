import { useEffect, useState, useMemo } from 'react';
import TasksList from './TasksList';
import { useDispatch, useSelector } from "react-redux";
import { addReward, removeReward } from "../../state/rewardsSlice";
import { fetchParticipants } from "../../state/participantsSlice";
import { Reward } from '../../../core/domain/Reward';
import Input from './Input';
import TextArea from './TextArea';
import Button from './Button';
import Select from './Select';
import { Check, Trash2, User } from 'react-feather';
import commonStyle from './Common.module.css';
import rewardFormStyle from './RewardForm.module.css';
import { dateToShortISOString } from '../../../core/domain/utils/date-utils';


const participantsToOptions = (participants: Participant[]) => {
	return participants?.map(participant => ({ value: participant.id, label: <><User style={{ color: participant.color }} /> {participant.name}</> }));
};


const RewardForm = ({ reward }: { reward: Reward }) => {
	const { participants } = useSelector((state) => state.participants);
	const participantsOptions = useMemo(() => participantsToOptions(participants.allIds.map(id => participants.byId[id])), [participants]);
	const dispatch = useDispatch();
	const [rewardData, setRewardData] = useState(reward);
	const [dueDate, setDueDate] = useState(rewardData?.dueDate || dateToShortISOString());
	const [startingDate, setStartingDate] = useState(dateToShortISOString());
	const [message, setMessage] = useState({ type: '', text: '' });

	useEffect(() => { dispatch(fetchParticipants()); }, []);

	useEffect(() => {
		const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

		const startingDateDate = new Date(startingDate);
		const dueDateDate = new Date(dueDate);

		const diffDays = Math.round((dueDateDate - startingDateDate) / oneDay) + 1;
		if (diffDays >= 0) {

			setMessage({ text: `The tasks described on the reward will last ${diffDays} day${diffDays > 1 ? 's' : ''}.` });
			setRewardData(rewardData => ({ ...rewardData, dueDate, startingDate, daysToCount: diffDays }));
		} else {
			setMessage({ type: 'ERROR', text: `The starting date needs to be before or same as due date.` });
		}

	}, [startingDate, dueDate]);
	useEffect(() => {
		if (rewardData && rewardData.participants === undefined) {
			setRewardData(rewardData => ({ ...rewardData, participants: participants.allIds }));
		}
	}, [participants, rewardData]);

	return <>
		<section className={commonStyle.section}>
			<header className={commonStyle['section-header']}>
				<h3>Reward</h3>
			</header>
			<div>
				<TextArea
					label="Description"
					value={rewardData?.description || ''}
					onChange={e => setRewardData({ ...rewardData, description: e.target.value })}
					placeholder="Reward description"
					className={rewardFormStyle.description}
				/>
				<div className={rewardFormStyle['dates-fields']}>
					<Input
						label="Starting Date"
						type="date"
						value={startingDate}
						onChange={e => setStartingDate(e.target.value)}
						placeholder="Starting Date"
					/>
					<Input
						label="Due Date"
						type="date"
						value={dueDate}
						onChange={e => setDueDate(e.target.value)}
						placeholder="Due Date"
					/>
				</div>

				<p className={`${rewardFormStyle.message}${message.type === "ERROR" ? ` ${rewardFormStyle.error}` : ''}`}>
					{message.text}
				</p>

				<Select
					isMulti
					label="Participants"
					value={(participantsToOptions(rewardData?.participants?.map(id => participants.byId[id])) || participantsOptions) || []}
					onChange={(selectedParticipants) => setRewardData({ ...rewardData, participants: selectedParticipants.map(participantOption => participantOption.value) })}
					options={participantsOptions}
				/>
			</div>
			<div className={rewardFormStyle.buttons}>
				<Button className={commonStyle.button} onClick={() => dispatch(addReward(rewardData))}>
					<Check />
				</Button>
				<Button
					disabled={!rewardData?.id}
					className={commonStyle.button}
					onClick={() => dispatch(removeReward(rewardData?.id))}
				>
					<Trash2 />
				</Button>
			</div>
		</section>
		{Boolean(rewardData?.id) && <TasksList rewardId={rewardData?.id} />}

	</>;

};

export default RewardForm;
