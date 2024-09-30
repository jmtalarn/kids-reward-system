import { FormattedMessage } from "react-intl";

export const getDiffDaysMessage = (startingDate?: string, dueDate?: string) => {
	const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

	let diffDays = 0;
	if (startingDate && dueDate) {
		const startingDateDate = new Date(startingDate);
		const dueDateDate = new Date(dueDate);

		diffDays = Math.round((dueDateDate.getTime() - startingDateDate.getTime()) / oneDay) + 1;


	}
	return (<FormattedMessage
		defaultMessage={`{count, plural, zero {} one {{count} day of tasks.} other {{count} days of tasks.}}`}
		values={{ count: diffDays }}
	/>);

};

export const getDaysRemainingOrOverdue = (dueDate?: string) => {
	const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

	if (dueDate) {
		const currentDate = new Date();
		const dueDateDate = new Date(dueDate);

		const diffDays = Math.round((dueDateDate.getTime() - currentDate.getTime()) / oneDay) + 1;
		if (diffDays > 0) {
			return <FormattedMessage
				defaultMessage={`{ count, plural, 
									one {{ count } day left.}
									other {{ count }  days left.}
								}`
				}
				values={{ count: diffDays }}
			/>;
		} else if (diffDays < 0) {
			return <FormattedMessage
				defaultMessage={`{ count, plural, 
									one {{ count } day overdue.}
									other {{ count } days overdue.}
								}`
				}
				values={{ count: Math.abs(diffDays) }}
			/>;
		} else {
			return (
				<FormattedMessage
					defaultMessage={`Due date is today.`}
				/>
			);
		}
	} else return "";

};


