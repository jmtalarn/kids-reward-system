import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../state/tasksSlice";
import { fetchRewards } from "../../state/rewardsSlice";
import { RewardId } from '../../../core/domain/Reward';
import { Task, type TaskId } from '../../../core/domain/Task';
import { RootState, AppDispatch } from '../store';
import { getRewardDueDate, getRewardStartingDate } from '../../../core/domain/utils/reward-utils';
import { parseShortIsoString } from '../../../core/domain/utils/date-utils';

export const useTasksForDate = () => {
	const { tasks } = useSelector((state: RootState) => state.tasks);
	const { rewards } = useSelector((state: RootState) => state.rewards);
	const { date: dateString } = useSelector((state: RootState) => state.date);

	const [filteredTasks, setFilteredTasks] = useState([]);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(fetchTasks({}));
		dispatch(fetchRewards());
	}, []);

	useEffect(() => {
		const date = parseShortIsoString();
		if (date) {
			const currentRewards = rewards
				.allIds
				.filter((rewardId: RewardId) => {
					const reward = rewards.byId[rewardId];
					if (reward?.recurring?.kind === "Weekly") {
						return reward.recurring.dates.includes(dateString);
					} else {
						return (getRewardStartingDate(reward) ?? new Date()).getTime() <= date.getTime() && (getRewardDueDate(reward)?.getTime() ?? 0) >= date.getTime();
					}

				});

			const filteredTasks = currentRewards?.reduce((acc: Task[], rewardId: RewardId) => [...acc, ...(tasks.byRewardId[rewardId] || [])], []);

			setFilteredTasks(filteredTasks.map((taskId: TaskId) => tasks.byId[taskId]));
		}
	}, [tasks, rewards, dateString]);

	return filteredTasks;
};


