import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { fetchRewards, addReward, removeReward } from '../../state/rewardsSlice';
//import { Check, Trash2, PlusSquare } from 'react-feather';
import { PlusSquare, Trash2, Edit, Award } from 'react-feather';
import Button from './Button';

import style from './RewardList.module.css';
import commonStyle from './Common.module.css';
import { dateToLongLocaleString } from '../../../core/domain/utils/date-utils';



const RewardList = () => {
	const { rewards } = useSelector((state) => state.rewards);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchRewards());
	}, []);
	return <section className={commonStyle.section}>
		<header className={commonStyle['section-header']}>
			<h3>Rewards</h3>
			<Button onClick={() => dispatch(addReward({}))}>
				<PlusSquare />
			</Button>
		</header>
		<div className={style['reward-list']}>
			{rewards.allIds.map(rewardId => {
				const reward = rewards.byId[rewardId];
				const dueDateMessage = reward.dueDate ? `Due date for this reward is ${dateToLongLocaleString(new Date(reward.dueDate))}.` : 'No due date set yet.';
				const startingDateMessage = reward.startingDate ? `Due date for this reward is ${dateToLongLocaleString(new Date(reward.startingDate))}.` : 'No starting date set yet.';
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

				)
			})}
		</div>
	</section >
}

export default RewardList;
