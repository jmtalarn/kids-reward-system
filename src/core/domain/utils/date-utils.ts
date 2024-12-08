import type { DayOfWeek } from "../Settings";

export const dateToShortISOString = (date?: Date) => {
	const dateToUse = date ?? new Date();
	const offset = dateToUse.getTimezoneOffset();
	return new Date(dateToUse.getTime() - (offset * 60 * 1000)).toISOString().substring(0, 10);

};

export const dateToLongLocaleString = (date?: Date) => (date ?? new Date()).toLocaleString('default', { weekday: 'long', day: "numeric", month: 'long' });

export const parseShortIsoString = (dateString?: string) => {
	const date = dateString ? new Date(dateString) : new Date();
	date.setHours(0, 0, 0, 0);
	return date;
};

export const getFirstAndLastDayOfCurrentMonth = () => {
	const currentDate = parseShortIsoString();

	const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
	const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
	return [firstDay, lastDay];
};



export function splitDaysInWeeks(days: Date[], selectedDate: Date) {
	const result = [];
	let j = 0;
	let selectedWeek = -1; //@TODO: It was undefined 
	for (let i = 0; i < days.length; i += 7) {
		const chunk = days.slice(i, i + 7);
		if (chunk.findIndex(c => dateToShortISOString(c) === dateToShortISOString(selectedDate)) !== -1) {
			selectedWeek = j;
		}
		result.push(chunk);
		j++;
	}
	return { weeks: result, weekIndex: selectedWeek };
}

export function getFullMonthWithCompleteWeeks(month: number, year: number, weekStartDay: DayOfWeek = 0) {
	const result = [];

	const firstDayOfMonth = new Date(Date.UTC(year, month, 1));
	const lastDayOfMonth = new Date(Date.UTC(year, month + 1, 0));

	// Get the first day of the week that includes the first day of the month
	const startOfWeek = new Date(firstDayOfMonth);
	const dayOffset = (startOfWeek.getDay() - weekStartDay + 7) % 7;  // Adjust based on the weekStartDay
	startOfWeek.setDate(firstDayOfMonth.getDate() - dayOffset);

	// Get the last day of the week that includes the last day of the month 
	const weekDays = [0, 1, 2, 3, 4, 5, 6].map(d => ((d + weekStartDay) % 7));


	const endOfWeek = new Date(lastDayOfMonth);
	const endDayOffset = 6 - weekDays.indexOf(lastDayOfMonth.getDay());

	endOfWeek.setDate(lastDayOfMonth.getDate() + endDayOffset);

	// Loop through from the start of the first full week to the end of the last full week
	const currentDay = new Date(startOfWeek);
	while (parseInt(dateToShortISOString(currentDay).replaceAll('-', ''), 10) <= parseInt(dateToShortISOString(endOfWeek).replaceAll('-', ''), 10)) {
		result.push(new Date(currentDay)); // Add a copy of the current date to the array
		currentDay.setDate(currentDay.getDate() + 1); // Move to the next day
	}

	return result;
}
