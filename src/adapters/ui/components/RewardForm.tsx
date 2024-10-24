import { useEffect, useMemo, useState } from 'react';
import { Trash2, User } from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from "react-redux";
import { MultiValue } from 'react-select';
import { Participant, ParticipantId } from '../../../core/domain/Participant';
import type { RecurringEvent } from '../../../core/domain/Recurring';
import { Reward, type RewardId } from '../../../core/domain/Reward';
import { dateToShortISOString } from '../../../core/domain/utils/date-utils';
import { fetchParticipants } from "../../state/participantsSlice";
import { addReward, removeReward } from "../../state/rewardsSlice";
import { AppDispatch, RootState } from '../../state/store';
import Button from './Button';
import commonStyle from './Common.module.css';
import Recurring from './Recurring';
import rewardFormStyle from './RewardForm.module.css';
import Select from './Select';
import TasksList from './TasksList';
import TextArea from './TextArea';
import { useDebounce } from '../hooks/useDebounce';


const ParticipantLabel = ({ participant }: { participant: Participant }) => <><User style={{ color: participant.color }} /> {participant.name}</>;


const RewardForm = ({ reward }: { reward: Reward }) => {
	const intl = useIntl();
	const dispatch = useDispatch<AppDispatch>();
	const { participants } = useSelector((state: RootState) => state.participants);
	const participantsOptions = useMemo(() => (participants.allIds.map((id: ParticipantId) => participants.byId[id])), [participants]);
	const [rewardId, setRewardId] = useState<RewardId>(reward?.id ?? '');
	const [rewardDescription, setRewardDescription] = useState<string>(reward?.description ?? '');
	const [rewardParticipants, setRewardParticipants] = useState<Participant[]>(reward?.participants ?? []);
	const [recurring, setRecurring] = useState<RecurringEvent>({ kind: "OnlyOnce", startingDate: dateToShortISOString(), dueDate: dateToShortISOString() });

	useEffect(() => { dispatch(fetchParticipants()); }, [dispatch]);
	useEffect(() => {
		if (participants && rewardParticipants === undefined) {
			setRewardParticipants(participants.allIds);
		}
	}, [participants, rewardParticipants]);

	useEffect(() => {
		setRewardDescription(reward?.description ?? '');
		setRecurring(reward?.recurring ?? { kind: "OnlyOnce", startingDate: dateToShortISOString(), dueDate: dateToShortISOString() });
		setRewardParticipants(reward?.participants || []);
		setRewardId(reward?.id);
	}, [reward]);

	const debouncedDescription = useDebounce<string>(rewardDescription, 500);
	const debouncedParticipants = useDebounce<Participant[]>(rewardParticipants, 500);
	const debouncedRecurring = useDebounce<RecurringEvent>(recurring, 500);
	useEffect(() => {

		dispatch(addReward(
			{
				id: rewardId,
				description: debouncedDescription,
				recurring: debouncedRecurring,
				participants: debouncedParticipants
			}
		));
	}, [debouncedDescription, debouncedParticipants, debouncedRecurring, dispatch, rewardId]);

	return <>
		<section className={commonStyle.section}>
			<header className={commonStyle['section-header']}>
				<h3><FormattedMessage defaultMessage={'Reward'} /></h3>
			</header>
			<div>
				<TextArea
					label={intl.formatMessage({ defaultMessage: "Description" })}
					value={rewardDescription || ''}
					onChange={e => setRewardDescription(e.target.value)}
					placeholder={intl.formatMessage({ defaultMessage: "Reward description" })}
					className={rewardFormStyle.description}
				/>
				<Recurring recurring={recurring} setRecurring={setRecurring} />

				<Select<Participant, true>
					isMulti
					label={intl.formatMessage({ defaultMessage: "Participants" })}
					value={(rewardParticipants?.map((id: ParticipantId) => participants.byId[id]) || participantsOptions) || []}

					onChange={(selectedParticipants: MultiValue<Participant>) => setRewardParticipants(selectedParticipants?.map((participant: Participant) => participant.id) ?? [])}

					getOptionLabel={(participant: Participant) => participant.name}
					formatOptionLabel={(participant: Participant) => <ParticipantLabel participant={participant} />}
					getOptionValue={(participant: Participant) => participant.id}

					options={participantsOptions}
				/>
			</div>
			<div className={rewardFormStyle.buttons}>
				{/* <Button
					className={commonStyle.button}
					onClick={() => dispatch(addReward(
						{
							...reward,
							description: rewardDescription,
							recurring,
							participants: rewardParticipants
						}
					)
					)}
				>
					<Check />
				</Button> */}
				<Button
					disabled={!reward?.id}
					className={commonStyle.button}
					onClick={() => dispatch(removeReward(reward?.id))}
				>
					<Trash2 />
				</Button>
			</div>
		</section>
		<hr />
		{Boolean(reward?.id) && <TasksList rewardId={reward?.id} />}

	</>;

};

export default RewardForm;
