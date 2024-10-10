import { useEffect, useRef, useState } from 'react';
import { Award, XCircle, ThumbsUp, ThumbsDown } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import Button from './Button';
import style from './ParticipantsRewardClaim.module.css';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../state/store';
import type { Reward } from '../../../core/domain/Reward';
import { fetchParticipants } from "../../state/participantsSlice";

import { fetchAssessments } from '../../state/assessmentsSlice';
import { fetchTasks } from '../../state/tasksSlice';
import { getDiffDays, getNewRecurring, getRewardDates } from '../../../core/domain/utils/reward-utils';
import { options } from '../../../core/domain/Options';
import type { Participant, ParticipantId } from '../../../core/domain/Participant';
import { addReward, removeReward } from '../../state/rewardsSlice';
import { addClaimedReward } from '../../state/claimedRewardsSlice';
// import type { RewardScore } from '../../../core/domain/ClaimedRewards';

interface ModalProps {
  openModal: boolean;
  closeModal: () => void;
  reward: Reward;
}


export const ParticipantsRewardClaim = ({ reward }: { reward: Reward }) => {

  const [modalOpen, setModalOpen] = useState<boolean>(false);


  return <>
    <Button className={style['settings-button']}
      onClick={() => setTimeout(() => setModalOpen(true), 150)}>
      <Award className={style['claim']} />
    </Button>
    {modalOpen && (<Modal
      openModal={modalOpen}
      closeModal={() => { setModalOpen(false); }}
      reward={reward}
    />)
    }
  </>;

};
// Modal as a separate component
const Modal: React.FC<ModalProps> = ({ openModal, closeModal, reward }) => {

  const { participants } = useSelector((state: RootState) => state.participants);
  const { assessments } = useSelector((state: RootState) => state.assessments);
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const [scores, setScores] = useState<{ maxScore: number, participantsScore: Record<ParticipantId, number> } | null>(null);
  const [participantsClaim, setParticipantsClaim] = useState<Record<ParticipantId, boolean>>();

  const ref = useRef<HTMLDialogElement>(null);
  // const intl = useIntl();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  useEffect(() => {
    dispatch(fetchParticipants());
    dispatch(fetchAssessments());
    dispatch(fetchTasks({}));
  }, []);

  useEffect(() => {
    if (tasks.allIds.length && reward?.participants?.length && participants.allIds.length && Object.keys(assessments).length) {
      //calculate total possible
      const maxValue = tasks.byRewardId[reward.id].length * getDiffDays(reward) * options.toSorted((a, b) => b.value - a.value)[0].value;
      //Per participant calculate assessments
      const dates = getRewardDates(reward);
      const participantsScore: Record<ParticipantId, number> = {};
      for (const participantId of reward?.participants ?? []) {
        for (const date of dates) {
          for (const taskId of tasks.byRewardId[reward.id]) {
            participantsScore[participantId] = (participantsScore[participantId] ?? 0) + (assessments?.[date]?.[participantId]?.[taskId] ?? 0);
          }
        }
      }
      setScores({ maxScore: maxValue, participantsScore });
    }
  }, [participants, assessments, tasks, reward]);

  const handleClaim = () => {

    //Store Claims
    Object.entries(participantsClaim ?? []).filter((item: [ParticipantId, boolean]) => item[1]).map((item: [ParticipantId, boolean]) => item[0]).forEach(participantId => {
      dispatch(addClaimedReward({ participantId, reward, score: [scores?.participantsScore[participantId] ?? 0, scores?.maxScore ?? 0] }));
    });
    //Update reward
    if (reward?.recurring?.kind === "OnlyOnce") {
      dispatch(removeReward(reward.id));
    } else {
      dispatch(addReward({ ...reward, recurring: getNewRecurring(reward) ?? undefined }));
    }
  };

  return (
    <dialog ref={ref} className={style.dialog} onCancel={closeModal}>
      <header className={style.header}>
        <button className={style['close-button']} onClick={closeModal}>
          <XCircle />
        </button>
      </header>
      <div className={style.content}>
        {participants.allIds.length > 0 && reward.participants?.map((id: ParticipantId) => participants.byId[id])
          .map((participant: Participant) => (
            <ParticipantClaim
              key={participant.id}
              participant={participant}
              maxScore={scores?.maxScore ?? 0}
              participantScore={scores?.participantsScore[participant.id] ?? 0}
              setParticipantClaim={(claimed: boolean) => { setParticipantsClaim(state => ({ ...state, [participant.id]: claimed })); }}
            />
          )
          )
        }
      </div>
      <div className={style.buttons}>
        <Button className={style['cancel-button']} onClick={() => closeModal()}>
          <FormattedMessage defaultMessage={"Cancel"} />
        </Button>
        <Button className={style['claim-button']} onClick={() => handleClaim()}>
          <FormattedMessage defaultMessage={"Claim"} />
        </Button>
      </div>

    </dialog >
  );
};


const ParticipantClaim = ({ participant, maxScore, participantScore, setParticipantClaim }: { participant: Participant, maxScore: number, participantScore: number, setParticipantClaim: (b: boolean) => void }) => {
  const { claimingConfirmationThreshold } = useSelector((state: RootState) => state.settings);
  const [buttonActive, setButtonActive] = useState<'up' | 'down'>((participantScore / maxScore * 100) > claimingConfirmationThreshold ? 'up' : 'down');

  return (
    <div
      key={participant.id}
      className={style['participant-score']}
    >
      <div className={style['participant-score-details']}>
        {participant.name} {participantScore}/{maxScore}
      </div>
      <div className={style['participant-score-buttons']}>
        <Button
          className={[style.thumb, style['thumb-up'], buttonActive === 'up' ? style.active : null].filter(Boolean).join(" ")}
          onClick={() => { setButtonActive('up'); setParticipantClaim(true); }}
        >
          <ThumbsUp />
        </Button >
        <Button
          className={[style.thumb, style['thumb-down'], buttonActive === 'down' ? style.active : null].filter(Boolean).join(" ")}
          onClick={() => { setButtonActive('down'); setParticipantClaim(false); }}
        >
          <ThumbsDown />
        </Button>
      </div>
    </div >
  );
};


