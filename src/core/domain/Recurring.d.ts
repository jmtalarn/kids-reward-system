export type RecurringType = "OnlyOnce" | "Weekly" | "Monthly" | "WholeMonth";

export type RecurringEventExcludeWeekly = {
	kind: Exclude<RecurringType, "Weekly">;
	startingDate: string;
	dueDate: string;
};
export type RecurringEventExtractWeekly = {
	kind: Extract<RecurringType, "Weekly">;
	dates: string[];
}
export type RecurringEvent =
	| RecurringEventExcludeWeekly
	| RecurringEventExtractWeekly;

