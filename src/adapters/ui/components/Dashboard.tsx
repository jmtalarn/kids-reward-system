import styles from './Dashboard.module.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../state/tasksSlice";
import { fetchRewards } from "../../state/rewardsSlice";
import { fetchParticipants } from '../../state/participantsSlice';
import { fetchAssessments } from '../../state/assessmentsSlice';
import { dateToLongLocaleString } from '../../../core/domain/utils/date-utils';
import { Award, User, HelpCircle } from 'react-feather';
import { ValueOptionMap } from '../../../core/domain/Options';
import { Participant } from '../../../core/domain/Participant';

export const Dashboard = () => (
  <div className={styles.dashboard}>
    <UpComingRewards />
    <UpComingRewards className={styles['span-2']} />
    <UpComingRewards />
    <ParticipantsRecentAssessments className={styles['span-3']} />
  </div>
);

const UpComingRewards = ({ className }: { className: string }) => {

  const { tasks } = useSelector((state) => state.tasks);
  const { rewards } = useSelector((state) => state.rewards);

  const [upcomingRewards, setUpcomingRewards] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks({}));
    dispatch(fetchRewards());
  }, []);

  useEffect(() => {

    setUpcomingRewards([...rewards.allIds.map(id => rewards.byId[id]).toSorted((a, b) => (new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()))].slice(0, 5));
  }, [tasks, rewards]);

  const date = new Date();

  return <article className={[styles.card, className].filter(Boolean).join(" ")}>
    <header className={styles['card-header']}><h3>Upcoming rewards</h3></header>
    <div className={styles['card-content']}>
      {upcomingRewards.length ? `These are ${upcomingRewards.length} the closer upcoming rewards.` : `There are no upcoming rewrds.`}

      {upcomingRewards.map(reward => <div key={reward.id} className={styles['upcoming-reward']}>
        <div className={styles['upcoming-reward-title']}>
          <Award color="gold" size="16" /> {reward.description || `No description given`}
        </div>
        <div className={styles['upcoming-reward-details']}>
          <div>Reward tasks ends on {dateToLongLocaleString(reward.dueDate)}.</div>
          <div>{new Date(reward.startingDate).getTime() > date.getTime() ? `Reward tasks not yet started` : `Reward tasks started on ${dateToLongLocaleString(reward.dueDate)}.`}</div>
        </div>
      </div>)}

    </div>
  </article>;
};

const ParticipantsRecentAssessments = ({ className }: { className: string }) => {
  const { participants } = useSelector((state) => state.participants);
  const { assessments } = useSelector((state) => state.assessments);
  const [participantAssessment, setParticipantAssessment] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchParticipants({}));
    dispatch(fetchAssessments());
  }, []);

  useEffect(() => {
    if (participants && assessments) {
      const temp = {};
      const lastAssessmentDates = Object.keys(assessments).map(date => ({ key: date, date: new Date(date) })).sort((a, b) => a.date.getTime() - b.date.getTime()).slice(0, 3).map(date => ({ ...date, assessments: assessments[date.key] }));

      for (const date of lastAssessmentDates) {
        for (const [participantId, taskValue] of Object.entries(date.assessments)) {
          temp[participantId] = [...(temp[participantId] ? temp[participantId] : []), ...Object.values(taskValue).map(value => ValueOptionMap[value] ?? <HelpCircle />)];
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
        .map(id => participants.byId[id])
        .map(participant => <UserAndAssessments
          key={participant.id}
          participant={participant}
          assessments={participantAssessment[participant.id] ?? []}
        />
        )
      }
    </div>

  </article>;
};

const UserAndAssessments = ({ participant, assessments }: { participant: Participant, assessments: ReactNode[] }) => (
  <div className={styles['user-assessments']}>
    <div><User style={{ color: participant.color }} /> {participant.name}</div>
    <div>
      {assessments.map((assessment, idx) => (<span key={`${participant.id}_${idx}`}>{assessment}</span>))}
    </div>
  </div>
);

export default Dashboard;
