import styles from './Dashboard.module.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../state/tasksSlice";
import { fetchRewards } from "../../state/rewardsSlice";
import { dateToLongLocaleString } from '../../../core/domain/utils/date-utils';
import { Award } from 'react-feather';

export const Dashboard = () => (
  <div className={styles.dashboard}>
    <UpComingRewards className={styles['span-2']} /><UpComingRewards /><UpComingRewards className={styles['span-3']} /><UpComingRewards />
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

  return <article className={[styles.card, className ?? null].filter(Boolean).join(" ")}>
    <header className={styles['card-header']}><h3>Upcoming rewards</h3></header>
    <div className={styles['card-content']}>
      {upcomingRewards.length ? `These are ${upcomingRewards.length} the closer upcoming rewards.` : `There are no upcoming rewrds.`}

      {upcomingRewards.map(reward => <div className={styles['upcoming-reward']}>
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
export default Dashboard;
