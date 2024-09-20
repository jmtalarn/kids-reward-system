export const getDiffDaysMessage = (startingDate, dueDate) => {
	const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

	if (Boolean(startingDate) && Boolean(dueDate)) {
		const startingDateDate = new Date(startingDate);
		const dueDateDate = new Date(dueDate);

		const diffDays = Math.round((dueDateDate - startingDateDate) / oneDay) + 1;
		return `${diffDays} days left.`;

	} else return "";

};
