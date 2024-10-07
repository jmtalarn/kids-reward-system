import type { Reward } from "../Reward";
import { parseShortIsoString } from "./date-utils";

const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

export const getRewardDueDate = (reward?: Reward) => {
	let dueDate;
	if (reward) {
		if (reward.recurring?.kind === "Weekly") {
			dueDate = reward.recurring.dates.map(parseShortIsoString).toSorted((a, b) => a.getTime() - b.getTime())[-1];
		} else {
			dueDate = reward.recurring?.dueDate ? parseShortIsoString(reward.recurring?.dueDate) : undefined;
		}
	}
	return dueDate;
};
export const getRewardStartingDate = (reward?: Reward) => {
	let startingDate;
	if (reward) {
		if (reward.recurring?.kind === "Weekly") {
			startingDate = reward.recurring.dates.map(parseShortIsoString).toSorted((a, b) => a.getTime() - b.getTime())[0];
		} else {
			startingDate = reward.recurring?.startingDate ? parseShortIsoString(reward.recurring?.startingDate) : undefined;
		}
	}
	return startingDate;
};

export const getDiffDays = (reward?: Reward) => {

	let diffDays = 0;
	if (reward) {
		const { recurring } = reward;
		if (recurring) {
			switch (recurring.kind) {
				case "OnlyOnce":
				case "Monthly":
				case "WholeMonth": {
					const startingDateDate = new Date(recurring.startingDate);
					const dueDate = new Date(recurring.dueDate);

					diffDays = Math.round((dueDate.getTime() - startingDateDate.getTime()) / oneDay) + 1;

					break;
				}
				case "Weekly":
					diffDays = recurring.dates.length;
					break;
			}
		}
	}
	return diffDays;
};

export const getNewRecurring = (reward: Reward) => {

	const { recurring } = reward;
	if (recurring) {
		if (recurring.kind === "Monthly") {
			const startingDate = new Date(parseShortIsoString(reward?.recurring?.startingDate ?? ''));
			return {
				kind: "Monthly",
				startingDate: "",
				dueDate: ""
			}; //Add a month
		} else if (recurring.kind === "WholeMonth") {
			return { kind: "WholeMonth", startingDate: "", dueDate: "" }; //set first and last day of next month
		} else if (recurring.kind === "Weekly") {
			return { kind: "Weekly", dates: }; //add 7 days to each date
		} else if (recurring.kind === "OnlyOnce") {
			return null;
		}

		return null;
	};
