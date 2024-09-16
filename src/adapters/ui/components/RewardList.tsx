import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { fetchRewards, addReward, removeReward } from '../../state/rewardsSlice';
//import { Check, Trash2, PlusSquare } from 'react-feather';
import { PlusSquare, Trash2, Edit, Award } from 'react-feather';
import Button from './Button';

import style from './RewardList.module.css';
import commonStyle from './Common.module.css';




const RewardList = () => {
	const { rewards } = useSelector((state) => state.rewards);
	// const [selectedReward, setSelectedReward] = useState();
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
		{rewards.allIds.map(rewardId => {
			const reward = rewards.byId[rewardId];
			return (
				<div
					key={reward.id || 'empty-key'}
					className={style['reward-list-item']}
					title={reward.dueDate ? `Due date for this reward is ${new Date(reward.dueDate).toLocaleString('default', { weekday: 'long', day: "numeric", month: 'long' })}` : 'No due date set yet.'}
				>
					<div className={style['reward-description']}>
						<Award color="gold" className={style['reward-icon']} />
						{reward.description || "No description yet"}
					</div>


					<div className={style.buttons}>
						<Button
							onClick={
								() => {
									//https://stackoverflow.com/a/72017777/4635829
									navigate(`/reward/${reward.id}`, { id: reward.id });
								}
							}
						>
							<Edit />
						</Button>

						<Button>
							<Trash2 onClick={() => dispatch(removeReward(rewardId))} />
						</Button>
					</div>
				</div>

			)
		})}
	</section >
}

export default RewardList;
