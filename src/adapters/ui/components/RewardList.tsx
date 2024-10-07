import { useEffect, useMemo, useRef, useState } from 'react';
import { Award, Edit, PlusSquare, Trash2 } from 'react-feather';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { addReward, fetchRewards, removeReward } from '../../state/rewardsSlice';
import { AppDispatch, RootState } from '../../state/store';
import Button from './Button';

import commonStyle from './Common.module.css';
import style from './RewardList.module.css';

import { FormattedMessage, useIntl } from 'react-intl';
import type { Reward } from '../../../core/domain/Reward';
import { RewardMessages } from '../../../core/domain/utils/reward-messages';
import { getNewRecurring, getRewardDueDate } from '../../../core/domain/utils/reward-utils';

type RewardFilterType = "Active" | "Overdue";


const RewardList = () => {
	const { rewards } = useSelector((state: RootState) => state.rewards);
	const filteredRewards = useMemo(() => rewards.allIds.reduce<Record<RewardFilterType, Reward[]>>((acc, curr) => {
		const reward = rewards.byId[curr];
		const currentDate = new Date();
		currentDate.setHours(0, 0, 0, 0);

		const dueDate = getRewardDueDate(reward);

		if (!dueDate || dueDate.getTime() >= currentDate.getTime()) {
			acc["Active"] = [...acc["Active"], reward];
		} else {
			acc["Overdue"] = [...acc["Overdue"], reward];
		}
		return acc;
	}, { "Active": [], "Overdue": [] }), [rewards]);

	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const lastRewardRef = useRef<null | HTMLDivElement>(null);
	const intl = useIntl();
	const [filterReward, setFilterReward] = useState<RewardFilterType>("Active");
	const rewardMessages = RewardMessages(intl);
	const isFilterRewardActive = filterReward === 'Active';
	const isFilterRewardOverdue = filterReward === 'Overdue';
	useEffect(() => {
		dispatch(fetchRewards());
	}, []);
	return <section className={commonStyle.section} ref={lastRewardRef}>
		<header className={[commonStyle['section-header'], style['section-header']].filter(Boolean).join(" ")}>
			<h3>
				<FormattedMessage defaultMessage={'Rewards'} />
			</h3>
			{isFilterRewardActive && <Button onClick={
				() => {
					dispatch(addReward({}));
					setTimeout(() => {
						lastRewardRef.current?.scrollIntoView({ block: 'end', behavior: "smooth" });
					}, 0);
				}
			}>
				<PlusSquare />
			</Button>}
		</header>
		<div className={style.filter}>

			<Button
				className={[isFilterRewardActive && style['filter-active']].filter(Boolean).join(" ")}
				onClick={() => setFilterReward("Active")}
			>
				<FormattedMessage defaultMessage={'Active'} />
			</Button>
			<Button
				className={[isFilterRewardOverdue && style['filter-active']].filter(Boolean).join(" ")}
				onClick={() => setFilterReward("Overdue")}
			>
				<FormattedMessage defaultMessage={'Overdue'} />
			</Button>
		</div>
		<div className={style['reward-list']}>
			{filteredRewards[filterReward].map((reward) => {
				// const reward = rewards.byId[rewardId];

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
							{isFilterRewardActive && <>
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
									onClick={() => dispatch(removeReward(reward.id))}
								>
									<Trash2 />
								</Button>
							</>}
							{isFilterRewardOverdue && <Button
								onClick={() => {
									if (reward?.recurring?.kind === "OnlyOnce") {
										dispatch(removeReward(reward.id));
									} else {
										dispatch(addReward({ ...reward, recurring: getNewRecurring(reward) }));
									}
								}
							>
								<Award className={style['claim']} />
							</Button>}
						</div>
					</div>
				);
			})}
		</div>
	</section >;
};

export default RewardList;
