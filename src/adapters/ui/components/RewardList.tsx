import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { fetchRewards, addReward, removeReward } from '../../state/rewardsSlice';
import { RootState, AppDispatch } from '../../state/store';
import { PlusSquare, Trash2, Edit, Award } from 'react-feather';
import Button from './Button';

import style from './RewardList.module.css';
import commonStyle from './Common.module.css';

import { RewardMessages } from '../../../core/domain/utils/reward-messages';
import { FormattedMessage, useIntl } from 'react-intl';



const RewardList = () => {
	const { rewards } = useSelector((state: RootState) => state.rewards);

	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const lastRewardRef = useRef<null | HTMLDivElement>(null);
	const intl = useIntl();
	const rewardMessages = RewardMessages(intl);

	useEffect(() => {
		dispatch(fetchRewards());
	}, []);
	return <section className={commonStyle.section} ref={lastRewardRef}>
		<header className={commonStyle['section-header']}>
			<h3><FormattedMessage defaultMessage={'Rewards'} /></h3>
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

				const dueDateMessage = rewardMessages.getDueDateMessage(reward);

				const startingDateMessage = rewardMessages.getStartingDateMessage(reward);
				const daysForTasksMessage = rewardMessages.getDiffDaysMessage(reward);
				const daysLeftOrOverdue = rewardMessages.getDaysRemainingOrOverdue(reward);

				return (
					<div
						key={reward.id || 'empty-key'}
						className={style['reward-list-item']}
						title={dueDateMessage}
					>
						<div className={style['reward-description']}>
							<div>
								<Award color="gold" className={style['reward-icon']} />
								{reward.description || intl.formatMessage({ defaultMessage: "No description yet" })}
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
										navigate(`/reward/${reward.id}`);
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
