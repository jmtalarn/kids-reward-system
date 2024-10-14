import { useEffect, useMemo } from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from "react-redux";
import { Participant } from '../../../core/domain/Participant';

import { dateToShortISOString, parseShortIsoString } from '../../../core/domain/utils/date-utils';
import { fetchClaimedRewards } from '../../state/claimedRewardsSlice';
import { AppDispatch, RootState } from '../../state/store';
import style from './Common.module.css';


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

	return participant && <section className={style.section}>
		<header className={style['section-header']}>
			<h3><FormattedMessage defaultMessage={`{name} claimed rewards`} values={{ name: participant.name }} /></h3>
		</header>

		{participant?.id
			&& participantClaimedRewards?.map(([date, data]) => {
				return (
					<div key={dateToShortISOString(date as Date)} className={style['claimed-reward']}>
						<h4><FormattedDate value={date as Date} dateStyle="full" /></h4>
						<ul>
							{Object.values(data).map(({ reward }) => (
								<li
									key={reward.id}
								>
									<div>
										{reward.description}
									</div>
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
