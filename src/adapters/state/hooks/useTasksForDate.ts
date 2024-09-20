import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../state/tasksSlice";
import { fetchRewards } from "../../state/rewardsSlice";

export const useTasksForDate = () => {
	const { tasks } = useSelector((state) => state.tasks);
	const { rewards } = useSelector((state) => state.rewards);
	const { date: dateString } = useSelector((state) => state.date);

	const [filteredTasks, setFilteredTasks] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchTasks({}));
		dispatch(fetchRewards());
	}, []);

	useEffect(() => {
		const date = new Date(dateString);
		if (date) {
			const currentRewards = rewards
				.allIds
				.filter(rewardId => {
					const reward = rewards.byId[rewardId];
					return new Date(reward.startingDate).getTime() <= date.getTime() && new Date(reward.dueDate).getTime() >= date.getTime();
				});

			const filteredTasks = currentRewards?.reduce((acc, rewardId) => acc = [...acc, ...(tasks.byRewardId[rewardId] || [])], []);
			setFilteredTasks(filteredTasks.map(taskId => tasks.byId[taskId]));
		}
	}, [tasks, rewards, dateString]);

	return filteredTasks;
};


