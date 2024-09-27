import { generateUuid } from '../../../core/domain/utils/generate-uuid';
import { Task, TaskId } from '../../../core/domain/Task';
import { RewardId } from '../../../core/domain/Reward';
const LOCAL_STORAGE_KEY = 'KRS_TASKS';

const getAllTasks = async (rewardId?: RewardId): Promise<Task[]> => {
	const tasksJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
	const tasks = tasksJSON ? JSON.parse(tasksJSON) : [];
	return rewardId ? tasks.filter((task: Task) => task.rewardId === rewardId) : tasks;
};

const addTask = async (rewardId: string, task: Task): Promise<Task[]> => {
	const tasks = await getAllTasks();
	const rewardTasks = tasks.filter((task: Task) => task.rewardId === rewardId);
	let updatedTasks;
	if (!task.id) {
		task.id = generateUuid();
		const lastRewardTask = rewardTasks?.slice(-1).pop();
		task.order = lastRewardTask?.order ? lastRewardTask.order + 1 : 0;
		task.rewardId = rewardId;
		updatedTasks = [...tasks, task];
	} else {
		updatedTasks = tasks.map((item: Task) => item.id === task.id ? task : item);
	}
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTasks));
	return updatedTasks;
};

const removeTask = async (rewardId: RewardId, taskId: TaskId): Promise<Task[]> => {
	const tasks = await getAllTasks();
	let updatedTasks;
	if (taskId) {
		updatedTasks = tasks.filter((task: Task) => task.id !== taskId);
	} else {
		updatedTasks = tasks.filter((task: Task) => task.rewardId !== rewardId);
	}
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTasks));
	return updatedTasks;
};

const reorderTask = async (rewardId: string, taskId: string, order: number): Promise<Task[]> => {
	const tasks = await getAllTasks();
	const rewardTasks = tasks.filter((task: Task) => task.rewardId === rewardId);

	const task = rewardTasks.find((task: Task) => task.id === taskId);
	const updatedRewardTasks = [...rewardTasks];
	if (task) {
		const currentIndex = rewardTasks.findIndex((task: Task) => task.id === taskId);
		updatedRewardTasks.splice(currentIndex, 1);
		updatedRewardTasks.splice(order, 0, task);

		const updatedTasks = [...tasks.filter((task: Task) => task.rewardId !== rewardId),
		...updatedRewardTasks.map((task: Task, idx: number) => ({ ...task, order: idx }))
		];
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTasks));
		return updatedTasks;
	}
	return tasks;



};



export default {
	getAllTasks,
	addTask,
	removeTask,
	reorderTask
};
