import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import tasksService from "../../core/services/TasksService"
import { Task } from '../../core/domain/Task'



export const fetchTasks = createAsyncThunk('tasks/fetch', async ({ rewardId }: { rewardId: string }) => {
	const tasks = await tasksService.getAllTasks(rewardId);
	return tasks;
});

export const addTask = createAsyncThunk('tasks/add', async ({ rewardId, task }: { rewardId: string, task: Task }) => {
	const tasks = await tasksService.addTask(rewardId, task);
	return tasks;
});

export const removeTask = createAsyncThunk('tasks/remove', async ({ rewardId, taskId }: { rewardId: string, taskId: string }) => {
	const tasks = await tasksService.removeTask(rewardId, taskId);
	return tasks;
});

export const reorderTask = createAsyncThunk('tasks/reorder', async ({ rewardId, taskId, order }: { rewardId: string, taskId: string, order: number }) => {
	const tasks = await tasksService.reorderTask(rewardId, taskId, order);
	return tasks;
});

const initialState = {
	tasks: [],
	loading: false,
	error: null
};

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
				state.tasks = action.payload;
				state.loading = false;
			})
			.addCase(fetchTasks.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? 'Failed to load tasks';
			})
			.addCase(addTask.fulfilled, (state, action) => {
				state.tasks = action.payload;
			})
			.addCase(removeTask.fulfilled, (state, action) => {
				state.tasks = action.payload;
			})
			.addCase(reorderTask.fulfilled, (state, action) => {
				state.tasks = action.payload;
			});
	},
});



// export const { addTask, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;
