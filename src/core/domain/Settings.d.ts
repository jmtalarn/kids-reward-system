// Utility type to recursively create a range of integers
type Range<Start extends number, End extends number, Acc extends unknown[] = []> =
	Acc['length'] extends End
	? Start | Acc['length']
	: Range<Start, End, [...Acc, unknown]>;


export type DayOfWeek = Range<0, 6>;
export type Percentage = Range<0, 100>;

export type SettingsType = {
	lang: LangType | null,
	firstDayOfWeek: DayOfWeek,
	claimingConfirmationThreshold: Percentage

}
