import { useEffect, useState } from 'react';
import TasksList from './TasksList';
import { useDispatch } from "react-redux";
import { addReward, removeReward } from "../../state/rewardsSlice";
import { Reward } from '../../../core/domain/Reward';
import Input from './Input';
import Button from './Button';
import { Check, Trash2 } from 'react-feather';
import commonStyle from './Common.module.css';
import rewardFormStyle from './RewardForm.module.css';


const RewardForm = ({ reward }: { reward: Reward }) => {
	// const { participants } = useSelector((state) => state.participants);
	const dispatch = useDispatch();
	const [rewardData, setRewardData] = useState(reward);
	const [dueDate, setDueDate] = useState(rewardData?.dueDate || new Date().toISOString().substring(0, 10));
	const [startingDate, setStartingDate] = useState(new Date().toISOString().substring(0, 10));
	const [message, setMessage] = useState({ type: '', text: '' });

	useEffect(() => {
		const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

		const startingDateDate = new Date(startingDate);
		const dueDateDate = new Date(dueDate);

		const diffDays = Math.round((dueDateDate - startingDateDate) / oneDay) + 1;
		if (diffDays >= 0) {

			setMessage({ text: `The tasks described on the reward will last ${diffDays} day${diffDays > 1 ? 's' : ''}.` });
			setRewardData(rewardData => ({ ...rewardData, daysToCount: diffDays }));
		} else {
			setMessage({ type: 'ERROR', text: `The starting date needs to be before or same as due date.` })
		}

	}, [startingDate, dueDate]);
	return <section className={commonStyle.section}>
		<header className={commonStyle['section-header']}>
			<h3>Reward</h3>
		</header>
		<div>
			<Input
				label="Description"
				value={rewardData?.description}
				onChange={e => setRewardData({ ...rewardData, description: e.target.value })} placeholder="Reward description"
			/>
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
			<p className={`${rewardFormStyle.message}${message.type === "ERROR" ? ` ${rewardFormStyle.error}` : ''}`}>
				{message.text}
			</p>

		</div>
		{Boolean(rewardData?.id) && <TasksList rewardId={rewardData?.id} />}
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
	</section >

}

export default RewardForm;
