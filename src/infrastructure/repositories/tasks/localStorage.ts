import { generateUuid } from '../../../core/domain/utils/generate-uuid';
import { Task } from '../domain/Task';
const LOCAL_STORAGE_KEY = 'KRS_TASKS';

const getAllTasks = async (rewardId?: string): Promise<Task[]> => {
	const tasksJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
	const tasks = tasksJSON ? JSON.parse(tasksJSON) : [];
	return rewardId ? tasks.filter(task => task.rewardId === rewardId) : tasks;
};

const addTask = async (rewardId: string, task: Task): Promise<Task[]> => {
	const tasks = await getAllTasks();
	const rewardTasks = tasks.filter(task => task.rewardId === rewardId);
	let updatedTasks;
	if (!task.id) {
		task.id = generateUuid();
		task.order = rewardTasks.length ? rewardTasks[rewardTasks.length - 1].order + 1 : 0;
		task.rewardId = rewardId;
		updatedTasks = [...tasks, task];
	} else {
		updatedTasks = tasks.map(item => item.id === task.id ? task : item)
	}
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTasks));
	return updatedTasks;
};

const removeTask = async (rewardId: string, taskId: string): Promise<Task[]> => {
	const tasks = await getAllTasks();
	let updatedTasks;
	if (taskId) {
		updatedTasks = tasks.filter(task => task.id !== taskId);
	} else {
		updatedTasks = tasks.filter(task => task.rewardId !== rewardId);
	}
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTasks));
	return updatedTasks;
};

const reorderTask = async (rewardId: string, taskId: string, order: number): Promise<Task[]> => {
	const tasks = await getAllTasks();
	const rewardTasks = tasks.filter(task => task.rewardId === rewardId);

	const task = rewardTasks.find(task => task.id === taskId);
	const currentIndex = rewardTasks.findIndex(task => task.id === taskId);
	const updatedRewardTasks = [...rewardTasks];
	updatedRewardTasks.splice(currentIndex, 1);
	updatedRewardTasks.splice(order, 0, task);

	const updatedTasks = [...tasks.filter(task => task.rewardId !== rewardId),
	...updatedRewardTasks.map((task, idx) => ({ ...task, order: idx }))
	];
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTasks));

	return updatedTasks;
};



export default {
	getAllTasks,
	addTask,
	removeTask,
	reorderTask
};
