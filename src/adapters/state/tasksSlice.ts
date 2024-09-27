import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import tasksService from "../../core/services/TasksService";
import { Task, TaskId } from '../../core/domain/Task';
import { removeAssessmentsForTaskId } from "./assessmentsSlice";
import { RewardId } from '../../core/domain/Reward';


export const fetchTasks = createAsyncThunk('tasks/fetch', async ({ rewardId }: { rewardId?: RewardId }) => {
	const tasks = await tasksService.getAllTasks(rewardId);
	return tasks;
});

export const addTask = createAsyncThunk('tasks/add', async ({ rewardId, task }: { rewardId: RewardId, task: Task }) => {
	const tasks = await tasksService.addTask(rewardId, task);
	return tasks;
});

export const removeTask = createAsyncThunk('tasks/remove', async ({ rewardId, taskId }: { rewardId: RewardId, taskId?: TaskId }, { dispatch }) => {
	const tasks = await tasksService.removeTask(rewardId, taskId);
	dispatch(removeAssessmentsForTaskId({ taskId }));
	return tasks;
});

export const reorderTask = createAsyncThunk('tasks/reorder', async ({ rewardId, taskId, order }: { rewardId: RewardId, taskId: TaskId, order: number }) => {
	const tasks = await tasksService.reorderTask(rewardId, taskId, order);
	return tasks;
});

type StateType = {
	tasks: {
		byId: Record<TaskId, Task>,
		allIds: TaskId[],
		byRewardId: Record<RewardId, TaskId[]>
	},
	loading: boolean,
	error: null | string
}
const initialState: StateType = {
	tasks: { byId: {}, allIds: [], byRewardId: {} },
	loading: false,
	error: null
};

const normalizeTasks = (tasks: Task[]) => (tasks.reduce((acc: StateType['tasks'], curr: Task) => {
	acc.byId[curr.id] = curr;
	acc.allIds.push(curr.id);
	acc.byRewardId[curr.rewardId] = [...(acc.byRewardId[curr.rewardId] || []), curr.id];
	return acc;
}, { byId: {}, allIds: [], byRewardId: {} }));

const tasksSlice = createSlice({
	name: "tasks",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTasks.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchTasks.fulfilled, (state, action) => {
				state.tasks = normalizeTasks(action.payload);
				state.loading = false;
			})
			.addCase(fetchTasks.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? 'Failed to load tasks';
			})
			.addCase(addTask.fulfilled, (state, action) => {
				state.tasks = normalizeTasks(action.payload);
			})
			.addCase(removeTask.fulfilled, (state, action) => {
				state.tasks = normalizeTasks(action.payload);
			})
			.addCase(reorderTask.fulfilled, (state, action) => {
				state.tasks = normalizeTasks(action.payload);
			});
	},
});



// export const { addTask, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;
