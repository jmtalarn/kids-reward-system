export const dateToShortISOString = (date: Date) => {
	const dateToUse = date ?? new Date();
	const offset = dateToUse.getTimezoneOffset();
	return new Date(dateToUse.getTime() - (offset * 60 * 1000)).toISOString().substring(0, 10);

};

export const dateToLongLocaleString = (date: Date) => (date ?? new Date()).toLocaleString('default', { weekday: 'long', day: "numeric", month: 'long' });

export const parseShortIsoString = (dateString: string) => {
	const date = new Date(dateString);
	date.setHours(0, 0, 0);
	return date;
};
