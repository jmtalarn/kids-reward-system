import type { RecurringEvent, RecurringEventExcludeWeekly, RecurringEventExtractWeekly } from "../Recurring";
import type { Reward } from "../Reward";
import { dateToShortISOString, parseShortIsoString } from "./date-utils";

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

export const getNewRecurring = (reward: Reward): RecurringEvent => {

	const { recurring } = reward;
	if (recurring) {
		if (recurring.kind === "Monthly") {

			const startingDate = new Date(parseShortIsoString((reward?.recurring as RecurringEventExcludeWeekly)?.startingDate));
			startingDate.setMonth(startingDate.getMonth() + 1);
			const dueDate = new Date(parseShortIsoString((reward?.recurring as RecurringEventExcludeWeekly)?.dueDate));
			dueDate.setMonth(dueDate.getMonth() + 1);

			return {
				kind: "Monthly",
				startingDate: dateToShortISOString(startingDate),
				dueDate: dateToShortISOString(dueDate)
			}; //Add a month
		} else if (recurring.kind === "WholeMonth") {
			const startingDate = new Date(parseShortIsoString((reward?.recurring as RecurringEventExcludeWeekly)?.startingDate));
			//set first and last day of next month
			startingDate.setDate(1);
			startingDate.setMonth(startingDate.getMonth() + 1);

			const dueDate = new Date(startingDate);
			dueDate.setMonth(dueDate.getMonth() + 1);
			dueDate.setDate(0);

			return {
				kind: "WholeMonth", startingDate: dateToShortISOString(startingDate),
				dueDate: dateToShortISOString(dueDate)
			};

		} else if (recurring.kind === "Weekly") {
			//add 7 days to each date
			const dates = (recurring as RecurringEventExtractWeekly)?.dates
				.map((dateString: string) => parseShortIsoString(dateString))
				.map((date: Date) => {
					date.setDate(date.getDate() + 7);
					return date;
				})
				.map(date => dateToShortISOString(date));

			return {
				kind: "Weekly", dates
			};

		} else if (recurring?.kind === "OnlyOnce") {
			return null;
		}

		return null;
	}
};
