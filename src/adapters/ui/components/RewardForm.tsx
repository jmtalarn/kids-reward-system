import { useEffect, useMemo, useState } from 'react';
import { Check, Trash2, User } from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from "react-redux";
import { MultiValue } from 'react-select';
import { Participant, ParticipantId } from '../../../core/domain/Participant';
import type { RecurringEvent } from '../../../core/domain/Recurring';
import { Reward } from '../../../core/domain/Reward';
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


const ParticipantLabel = ({ participant }: { participant: Participant }) => <><User style={{ color: participant.color }} /> {participant.name}</>;

// const getDiffDays = (startingDate: string, dueDate: string) => {
// 	const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

// 	const startingDateDate = new Date(startingDate).getTime();
// 	const dueDateDate = new Date(dueDate).getTime();

// 	const diffDays = Math.round((dueDateDate - startingDateDate) / oneDay) + 1;
// 	return diffDays;
// };
const RewardForm = ({ reward }: { reward: Reward }) => {
	const { participants } = useSelector((state: RootState) => state.participants);
	const participantsOptions = useMemo(() => (participants.allIds.map((id: ParticipantId) => participants.byId[id])), [participants]);
	const dispatch = useDispatch<AppDispatch>();

	const [rewardDescription, setRewardDescription] = useState<string>(reward?.description ?? '');
	const [rewardParticipants, setRewardParticipants] = useState<Participant[]>(reward?.participants ?? []);
	const [recurring, setRecurring] = useState<RecurringEvent>({ kind: "OnlyOnce", startingDate: dateToShortISOString(), dueDate: dateToShortISOString() });
	// const [dueDate, setDueDate] = useState<string>(reward?.dueDate ?? dateToShortISOString());
	// const [startingDate, setStartingDate] = useState<string>(reward?.startingDate ?? dateToShortISOString());
	// const [message, setMessage] = useState<{ type?: string, text?: ReactNode }>({ type: '', text: '' });
	const intl = useIntl();
	useEffect(() => { dispatch(fetchParticipants()); }, []);



	useEffect(() => {
		if (participants && rewardParticipants === undefined) {
			setRewardParticipants(participants.allIds);
		}
	}, [participants, rewardParticipants]);
	useEffect(() => {
		setRewardDescription(reward?.description ?? '');
		setRecurring(reward?.recurring ?? { kind: "OnlyOnce", startingDate: dateToShortISOString(), dueDate: dateToShortISOString() });
		// setDueDate(reward?.dueDate ?? dateToShortISOString());
		// setStartingDate(reward?.startingDate ?? dateToShortISOString());
		setRewardParticipants(reward?.participants || []);
	}, [reward]);

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
				{/* 
				<div className={rewardFormStyle['dates-fields']}>
					<Input
						label={intl.formatMessage({ defaultMessage: "Starting Date" })}
						type="date"
						value={startingDate}
						onChange={e => setStartingDate(e.target.value)}
						placeholder={intl.formatMessage({ defaultMessage: "Starting Date" })}
					/>
					<Input
						label={intl.formatMessage({ defaultMessage: "Due Date" })}
						type="date"
						value={dueDate}
						onChange={e => setDueDate(e.target.value)}
						placeholder={intl.formatMessage({ defaultMessage: "Due Date" })}
					/>
				</div> */}
				{/* 
				<p className={`${rewardFormStyle.message}${message.type === "ERROR" ? ` ${rewardFormStyle.error}` : ''}`}>
					{message.text}
				</p> */}

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
				<Button
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
				</Button>
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
