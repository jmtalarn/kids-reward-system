import { configureStore } from "@reduxjs/toolkit";
import rewardsReducer from "./rewardsSlice";
import participantsReducer from "./participantsSlice";
import tasksReducer from './tasksSlice';
import assessmentsReducer from "./assessmentsSlice";
import dateReducer from "./dateSlice";

const store = configureStore({
	reducer: {
		rewards: rewardsReducer,
		participants: participantsReducer,
		tasks: tasksReducer,
		assessments: assessmentsReducer,
		date: dateReducer
	},
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
