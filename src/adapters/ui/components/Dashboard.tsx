import { useEffect, useState } from 'react';
import { Award, HelpCircle, User } from 'react-feather';
import { useDispatch, useSelector } from "react-redux";
import { ValueOptionMap } from '../../../core/domain/Options';
import { Participant, ParticipantId } from '../../../core/domain/Participant';
import { dateToLongLocaleString, parseShortIsoString } from '../../../core/domain/utils/date-utils';
import { getDiffDaysMessage } from '../../../core/domain/utils/messages';
import { fetchAssessments } from '../../state/assessmentsSlice';
import { fetchParticipants } from '../../state/participantsSlice';
import { fetchRewards } from "../../state/rewardsSlice";
import { fetchTasks } from "../../state/tasksSlice";
import { AppDispatch, RootState } from '../../state/store';
import styles from './Dashboard.module.css';
import type { Reward } from '../../../core/domain/Reward';


export const Dashboard = () => (
  <div className={styles.dashboard}>
    <UpComingRewards />
    <UpComingRewards className={styles['span-2']} />
    <Figures className={styles['span-2']} />
    <UpComingRewards />
    <ParticipantsRecentAssessments className={styles['span-3']} />
    <UpComingRewards />
  </div>
);
const Figures = ({ className }: { className?: string }) => {
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const { rewards } = useSelector((state: RootState) => state.rewards);
  const { participants } = useSelector((state: RootState) => state.participants);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTasks({}));
    dispatch(fetchRewards());
    dispatch(fetchParticipants());
  }, []);

  return <article className={[styles.card, styles.figures, styles['card-content'], className].filter(Boolean).join(" ")}>
    <div> <span className={styles.figure}>{rewards?.allIds.length}</span> rewards set until now.</div>
    <div> There are <span className={styles.figure}>{participants?.allIds.length}</span> participants.</div>
    <div> A total of <span className={styles.figure}>{tasks?.allIds.length}</span> tasks managed. </div>
  </article>;
};
const UpComingRewards = ({ className }: { className?: string }) => {

  const { tasks } = useSelector((state: RootState) => state.tasks);
  const { rewards } = useSelector((state: RootState) => state.rewards);

  const [upcomingRewards, setUpcomingRewards] = useState<Reward[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTasks({}));
    dispatch(fetchRewards());
  }, []);

  useEffect(() => {

    setUpcomingRewards([...rewards.allIds.map(id => rewards.byId[id]).toSorted((a: Reward, b: Reward) => {
      const aValue = a.dueDate ? parseShortIsoString(a.dueDate).getTime() : 0;
      const bValue = b.dueDate ? parseShortIsoString(b.dueDate).getTime() : 0;
      return (aValue - bValue);
    })].slice(0, 5));
  }, [tasks, rewards]);

  const date = new Date();

  return <article className={[styles.card, className].filter(Boolean).join(" ")}>
    <header className={styles['card-header']}><h3>Upcoming rewards</h3></header>
    <div className={styles['card-content']}>
      {upcomingRewards.length ? `These are ${upcomingRewards.length} the closer upcoming rewards.` : `There are no upcoming rewrds.`}

      {upcomingRewards.map((reward: Reward) => <div key={reward.id} className={styles['upcoming-reward']}>
        <div className={styles['upcoming-reward-title']}>
          <Award color="gold" size="16" /> {reward.description || `No description given`}
        </div>
        <div className={styles['upcoming-reward-details']}>
          <div>{reward.dueDate && `Reward tasks ends on ${dateToLongLocaleString(parseShortIsoString(reward.dueDate))}`}.</div>
          <div>{reward.startingDate && (new Date(reward.startingDate).getTime() > date.getTime() ? `Reward tasks not yet started.` : `Reward tasks started on ${dateToLongLocaleString(parseShortIsoString(reward.startingDate))}.`)}</div>
          <span style={{ fontWeight: "bold" }}>{getDiffDaysMessage(reward.startingDate, reward.dueDate)}</span>
        </div>
      </div>)}

    </div>
  </article>;
};

const ParticipantsRecentAssessments = ({ className }: { className?: string }) => {
  const { participants } = useSelector((state: RootState) => state.participants);
  const { assessments } = useSelector((state: RootState) => state.assessments);
  const [participantAssessment, setParticipantAssessment] = useState<Record<ParticipantId, JSX.Element[]>>({});
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchParticipants());
    dispatch(fetchAssessments());
  }, []);

  useEffect(() => {
    if (participants && assessments) {
      const temp: Record<ParticipantId, JSX.Element[]> = {};
      const lastAssessmentDates = Object.keys(assessments).map(date => ({ key: date, date: new Date(date) })).sort((a, b) => a.date.getTime() - b.date.getTime()).slice(0, 3).map(date => ({ ...date, assessments: assessments[date.key] }));

      for (const date of lastAssessmentDates) {
        for (const [participantId, taskValue] of Object.entries(date.assessments)) {
          temp[participantId] = [...(temp[participantId] ? temp[participantId] : []), ...Object.values(taskValue).map((value, idx) => ValueOptionMap[value] ?? <HelpCircle key={`${participantId}_${idx}`} />)];
        }
      }

      setParticipantAssessment(temp);
    }


  }, [assessments, participants]);
  return <article className={[styles.card, className].filter(Boolean).join(" ")}>
    <header className={styles['card-header']}><h3>Recent assessments</h3></header>
    <div className={styles['card-content']}>
      These are the more recent assessments for the participants.
      {participants
        .allIds
        .map((id: ParticipantId) => participants.byId[id])
        .map((participant: Participant) => <UserAndAssessments
          key={participant.id}
          participant={participant}
          assessments={participantAssessment[participant.id] ?? []}
        />
        )
      }
    </div>

  </article>;
};

const UserAndAssessments = ({ participant, assessments }: { participant: Participant, assessments: JSX.Element[] }) => (
  <div className={styles['user-assessments']}>
    <div><User style={{ color: participant.color }} /> {participant.name}</div>
    <div>
      {assessments.map((assessment: JSX.Element, idx: number) => (<span key={`${participant.id}_${idx}`}>{assessment}</span>))}
    </div>
  </div>
);

export default Dashboard;
