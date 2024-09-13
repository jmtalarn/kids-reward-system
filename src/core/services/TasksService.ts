import { Task } from '../domain/Task';

import tasksRepository from '../../infrastructure/repositories/tasks/localStorage';

const getAllTasks = async (rewardId: string): Promise<Task[]> => {
	const tasks = await tasksRepository.getAllTasks(rewardId);
	return tasks;
};

const addTask = async (rewardId: string, task: Task): Promise<Task[]> => {

	const tasks = await tasksRepository.addTask(rewardId, task);

	return tasks;
};

const removeTask = async (rewardId: string, taskId: string): Promise<Task[]> => {
	const tasks = await tasksRepository.removeTask(rewardId, taskId);
	return tasks;
}

const reorderTask = async (rewardId: string, taskId: string, order: number): Promise<Task[]> => {
	const tasks = await tasksRepository.reorderTask(rewardId, taskId, order);
	return Promise.resolve(tasks);
}

export default {
	getAllTasks,
	addTask,
	removeTask,
	reorderTask
};

