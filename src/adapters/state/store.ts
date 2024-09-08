import { configureStore } from "@reduxjs/toolkit";
//import rewardsReducer from "./rewardsSlice";
import participantsReducer from "./participantsSlice";
import tasksReducer from './tasksSlice';
//import assessmentsReducer from "./assessmentsSlice";

const store = configureStore({
	reducer: {
		//rewards: rewardsReducer,
		participants: participantsReducer,
		tasks: tasksReducer,
		//assessments: assessmentsReducer,
	},
});

export default store;
