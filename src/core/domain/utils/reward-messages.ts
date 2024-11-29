import { type IntlShape } from "react-intl";
import type { Reward } from "../Reward";
import { getDiffDays, getRewardDueDate, getRewardStartingDate } from "./reward-utils";


export const RewardMessages = (intl: IntlShape) => {

	const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

	const getDiffDaysMessage = (reward: Reward) => {

		const diffDays = getDiffDays(reward);

		return (intl.formatMessage({ defaultMessage: `{count, plural, =0 {} one {{count} day of tasks.} other {{count} days of tasks.}}` }, { count: diffDays }));

	};


	const getDaysRemainingOrOverdue = (reward: Reward) => {

		const dueDate = getRewardDueDate(reward);

		if (dueDate) {
			const currentDate = new Date();
			// const dueDate = new Date(dueDate);

			const diffDays = Math.round((dueDate.getTime() - currentDate.getTime()) / oneDay) + 1;
			if (diffDays > 0) {
				return intl.formatMessage(
					{
						defaultMessage: `{ count, plural, 
									one {{ count } day left.}
									other {{ count }  days left.}
								}`
					},
					{ count: diffDays });
			} else if (diffDays < 0) {
				return intl.formatMessage(
					{
						defaultMessage: `{ count, plural, 
									one {{ count } day overdue.}
									other {{ count } days overdue.}
								}`
					}, { count: Math.abs(diffDays) });
			} else {
				return intl.formatMessage({ defaultMessage: `Due date is today.` });
			}
		} else return "";

	};


	const getDueDateMessage = (reward: Reward) => {
		const dueDate = getRewardDueDate(reward);
		if (dueDate) {
			return intl.formatMessage(
				{ defaultMessage: `Due date for this reward is {formattedDate}.` },
				{ formattedDate: intl.formatDate(dueDate, { dateStyle: "full" }) }
			);
		}

		return intl.formatMessage({ defaultMessage: 'No due date set yet' });
	};

	const getStartingDateMessage = (reward: Reward) => {
		const startingDate = getRewardStartingDate(reward);
		if (startingDate) {
			return intl.formatMessage(
				{ defaultMessage: `Starting date for this reward is {formattedDate}.` },
				{ formattedDate: intl.formatDate(startingDate, { dateStyle: "full" }) }
			);
		}
		return intl.formatMessage({ defaultMessage: 'No starting date set yet.' });

	};

	return {
		getDaysRemainingOrOverdue,
		getDiffDaysMessage,
		getStartingDateMessage,
		getDueDateMessage
	};
};

export default RewardMessages;

