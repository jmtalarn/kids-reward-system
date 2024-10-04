export type RecurringType = "OnlyOnce" | "Weekly" | "Monthly" | "WholeMonth";

export type RecurringEvent =
	| {
		kind: Exclude<RecurringType, "Weekly">;
		startingDate: string;
		dueDate: string;
	}
	| {
		kind: Extract<RecurringType, "Weekly">;
		dates: string[];
	};

