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


