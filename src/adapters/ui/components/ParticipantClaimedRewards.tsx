import { useEffect, useMemo } from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from "react-redux";
import { Participant } from '../../../core/domain/Participant';

import { dateToShortISOString, parseShortIsoString } from '../../../core/domain/utils/date-utils';
import { fetchClaimedRewards } from '../../state/claimedRewardsSlice';
import { AppDispatch, RootState } from '../../state/store';
import commonStyle from './Common.module.css';
import style from './ParticipantClaimedRewards.module.css';
import { Award } from 'react-feather';
import type { Reward } from '../../../core/domain/Reward';
import type { RewardScore } from '../../../core/domain/ClaimedRewards';

export const ParticipantClaimedRewards = ({ participant }: { participant?: Participant }) => {
	const { claimedRewards } = useSelector((state: RootState) => state.claimedRewards);
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(fetchClaimedRewards());
	}, []);

	const participantClaimedRewards = useMemo(() => {
		if (participant) {
			const claimedRewardsByDate = Object.entries(claimedRewards[participant.id] ?? []).map(([date, data]) => [parseShortIsoString(date), data]).sort((a, b) => (a[0] as Date).getTime() - (b[0] as Date).getTime());
			return claimedRewardsByDate;
		}
	}, [participant, claimedRewards]);

	return participant && <section className={commonStyle.section}>
		<header className={commonStyle['section-header']}>
			<h3><FormattedMessage defaultMessage={`{name} claimed rewards`} values={{ name: <span style={{ color: participant.color ?? 'inherit' }}>{participant.name}</span> }} /></h3>
		</header>

		{participant?.id
			&& participantClaimedRewards?.map(([date, data]) => {
				return (
					<div className={style.date} key={dateToShortISOString(date as Date)} >
						<h4><FormattedDate value={date as Date} dateStyle="full" /></h4>
						<ul className={style['rewards-list']}>
							{Object.values(data).map(({ reward, score, tasksDone }: { reward: Reward, score: RewardScore, tasksDone: string[] }) => (
								<li
									key={reward.id}
								>
									<details>
										<summary>
											<header>
												<Award color="gold" />
												<div>
													{reward.description}
												</div>
												<div className={style.score}><FormattedMessage
													defaultMessage={'Score: {score} out of {scoreMax}'}
													values={{ score: score[0], scoreMax: score[1] }} /></div>
											</header>
										</summary>
										<div className={style['reward-tasks']}>

											<ul>
												{tasksDone?.map(task => (<li
													key={task.split(" ").join("_")}
												>
													{task}
												</li>)
												) ?? <FormattedMessage defaultMessage={'There are no records for tasks for this reward.'} />}
											</ul>
										</div>
									</details>


								</li>
							)
							)
							}
						</ul>
					</div>);
			})}
	</section>;
};

export default ParticipantClaimedRewards;
