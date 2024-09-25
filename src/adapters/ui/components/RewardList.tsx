import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { fetchRewards, addReward, removeReward } from '../../state/rewardsSlice';
//import { Check, Trash2, PlusSquare } from 'react-feather';
import { PlusSquare, Trash2, Edit, Award } from 'react-feather';
import Button from './Button';

import style from './RewardList.module.css';
import commonStyle from './Common.module.css';
import { dateToLongLocaleString } from '../../../core/domain/utils/date-utils';
import { getDiffDaysMessage, getDaysRemainingOrOverdue } from '../../../core/domain/utils/messages';



const RewardList = () => {
	const { rewards } = useSelector((state) => state.rewards);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const lastRewardRef = useRef<null | HTMLDivElement>(null);

	useEffect(() => {
		dispatch(fetchRewards());
	}, []);
	return <section className={commonStyle.section} ref={lastRewardRef}>
		<header className={commonStyle['section-header']}>
			<h3>Rewards</h3>
			<Button onClick={
				() => {
					dispatch(addReward({}));
					setTimeout(() => {
						lastRewardRef.current?.scrollIntoView({ block: 'end', behavior: "smooth" });
					}, 0);
				}
			}>
				<PlusSquare />
			</Button>
		</header>
		<div className={style['reward-list']}>
			{rewards.allIds.map((rewardId) => {
				const reward = rewards.byId[rewardId];
				const dueDateMessage = reward.dueDate ? `Due date for this reward is ${dateToLongLocaleString(new Date(reward.dueDate))}.` : 'No due date set yet.';
				const startingDateMessage = reward.startingDate ? `Starting date for this reward is ${dateToLongLocaleString(new Date(reward.startingDate))}.` : 'No starting date set yet.';
				const daysForTasksMessage = getDiffDaysMessage(reward.startingDate, reward.dueDate);
				const daysLeftOrOverdue = getDaysRemainingOrOverdue(reward.dueDate);

				return (
					<div
						key={reward.id || 'empty-key'}
						className={style['reward-list-item']}
						title={dueDateMessage}
					>
						<div className={style['reward-description']}>
							<div>
								<Award color="gold" className={style['reward-icon']} />
								{reward.description || "No description yet"}
							</div>
							<div className={style['additional-description']}>
								<div>{startingDateMessage}</div>
								<div>{dueDateMessage}</div>
								<div className={style['highlight-description']}>{daysForTasksMessage} {daysLeftOrOverdue}</div>
							</div>
						</div>
						<div className={style.buttons}>
							<Button
								onClick={
									() => {
										navigate(`/reward/${reward.id}`, { id: reward.id });
									}
								}
							>
								<Edit />
							</Button>

							<Button
								onClick={() => dispatch(removeReward(rewardId))}
							>
								<Trash2 />
							</Button>
						</div>
					</div>

				);
			})}
		</div>
	</section >;
};

export default RewardList;
