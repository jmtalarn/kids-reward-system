import { useEffect, useMemo, useState, useCallback } from 'react';
import { Trash2, User } from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from "react-redux";
import { MultiValue } from 'react-select';
import { Participant, ParticipantId } from '../../../core/domain/Participant';
import type { RecurringEvent } from '../../../core/domain/Recurring';
import { Reward } from '../../../core/domain/Reward';
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
	console.log({ reward });
	const intl = useIntl();
	const dispatch = useDispatch<AppDispatch>();
	const { participants } = useSelector((state: RootState) => state.participants);
	const participantsOptions = useMemo(() => (participants.allIds.map((id: ParticipantId) => participants.byId[id])), [participants]);
	const [updatedReward, setUpdatedReward] = useState<Reward | undefined>();

	useEffect(() => { dispatch(fetchParticipants()); }, [dispatch]);

	useEffect(() => {
		if (reward) {
			setUpdatedReward(reward);
		}
	}, [reward]);

	const debouncedUpdatedReward = useDebounce<Reward | undefined>(updatedReward, 500);

	useEffect(() => {
		console.log({ reward, debouncedUpdatedReward });
		if (debouncedUpdatedReward && updatedReward !== reward) {
			dispatch(addReward(
				debouncedUpdatedReward
			));
		}
	}, [debouncedUpdatedReward, dispatch]);

	const handleSetRecurring = useCallback((recurring: RecurringEvent) => {
		setUpdatedReward(prev => ({ ...prev, recurring }));
	}, []);
	return <>
		<section className={commonStyle.section}>
			<header className={commonStyle['section-header']}>
				<h3><FormattedMessage defaultMessage={'Reward'} /></h3>
			</header>
			<div>
				<TextArea
					label={intl.formatMessage({ defaultMessage: "Description" })}
					value={updatedReward?.description || ''}
					onChange={e => setUpdatedReward({ ...updatedReward, description: e.target.value })}
					placeholder={intl.formatMessage({ defaultMessage: "Reward description" })}
					className={rewardFormStyle.description}
				/>
				<Recurring recurring={updatedReward?.recurring} setRecurring={handleSetRecurring} />

				<Select<Participant, true>
					isMulti
					label={intl.formatMessage({ defaultMessage: "Participants" })}
					value={(updatedReward?.participants?.map((id: ParticipantId) => participants.byId[id]) || participantsOptions) || []}

					onChange={(selectedParticipants: MultiValue<Participant>) => {
						// setRewardParticipants(selectedParticipants?.map((participant: Participant) => participant.id) ?? [])
						setUpdatedReward({ ...reward, participants: selectedParticipants?.map((participant: Participant) => participant.id) ?? [] });
					}
					}

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
