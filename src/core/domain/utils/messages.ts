export const getDiffDaysMessage = (startingDate, dueDate) => {
	const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

	if (Boolean(startingDate) && Boolean(dueDate)) {
		const startingDateDate = new Date(startingDate);
		const dueDateDate = new Date(dueDate);

		const diffDays = Math.round((dueDateDate - startingDateDate) / oneDay) + 1;
		return `${diffDays} days of tasks.`;

	} else return "";

};

export const getDaysRemainingOrOverdue = (dueDate) => {
	const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

	if (dueDate) {
		const currentDate = new Date();
		const dueDateDate = new Date(dueDate);

		const diffDays = Math.round((dueDateDate - currentDate) / oneDay) + 1;
		if (diffDays > 0) {
			return `${diffDays} days left.`;
		} else if (diffDays < 0) {
			return `${Math.abs(diffDays)} days overdue.`;
		} else {
			return `Due date is today.`;
		}


	} else return "";

};


