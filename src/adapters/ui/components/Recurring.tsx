import { useEffect, useMemo, useState, type ReactNode } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { type RecurringEvent, type RecurringType } from "../../../core/domain/Recurring";
// import type { Reward } from "../../../core/domain/Reward";
import style from './Recurring.module.css';
import commonStyle from './Common.module.css';
import Input from "./Input";
import { dateToShortISOString, getFirstAndLastDayOfCurrentMonth, getFullMonthWithCompleteWeeks, parseShortIsoString, splitDaysInWeeks } from "../../../core/domain/utils/date-utils";

import { useSelector } from "react-redux";
import type { RootState } from "../../state/store";
import { getDiffDays, getRewardDueDate, getRewardStartingDate } from "../../../core/domain/utils/reward-utils";

export const Recurring = ({ recurring, setRecurring }: { recurring?: RecurringEvent, setRecurring: (recurring: RecurringEvent) => void }) => {
	const intl = useIntl();
	const [selectedRecurringType, setSelectedRecurringType] = useState<RecurringType>("OnlyOnce");
	const [dueDate, setDueDate] = useState<string>(() => dateToShortISOString(getRewardDueDate({ recurring })));
	const [startingDate, setStartingDate] = useState<string>(() => dateToShortISOString(getRewardStartingDate({ recurring })));
	const [weekDays, setWeekDays] = useState<string[]>([]);
	const [additionalInfo, setAdditionalInfo] = useState<{ type?: string, text?: ReactNode }>({});

	const [firstMonthDay, lastMonthDay] = useMemo(getFirstAndLastDayOfCurrentMonth, []);
	const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		console.log(evt.target.value);
		setSelectedRecurringType(evt.target.value as RecurringType);
	};
	const setAdditionalInfoMessage = (recurring: RecurringEvent) => {
		const diffDays = getDiffDays({ recurring });

		if (recurring?.kind !== "Weekly") {
			if (diffDays > 0) {
				setAdditionalInfo({
					text:
						<FormattedMessage defaultMessage={`The tasks described on the reward will last 	{count, plural, 
							one {# day} 
							other {# days}
						}
					.`} values={{ count: diffDays }} />
				});

			} else if (diffDays < 0) {
				setAdditionalInfo({ type: 'ERROR', text: <FormattedMessage defaultMessage={`The starting date needs to be before or same as due date.`} /> });
			} else {
				setAdditionalInfo({ type: '', text: '' });
			}
		} else {
			if (diffDays > 0) {
				setAdditionalInfo({
					text:
						<FormattedMessage defaultMessage={`The tasks described on the reward are set for {count, plural, 
							=0 { any day}
							one {# day} 
							other {# days}
						}
					.`} values={{ count: diffDays }} />
				});
			} else {
				setAdditionalInfo({ type: '', text: '' });
			}
		}

	};

	useEffect(() => {
		let recurring;
		if (selectedRecurringType === "Weekly") {
			recurring = { kind: selectedRecurringType, dates: weekDays };
		} else if (selectedRecurringType === "WholeMonth") {
			recurring = {
				kind: selectedRecurringType,
				startingDate: dateToShortISOString(firstMonthDay),
				dueDate: dateToShortISOString(lastMonthDay)
			};
		} else {
			recurring = {
				kind: selectedRecurringType,
				startingDate: startingDate,
				dueDate: dueDate
			};
		}
		if (recurring) {
			setAdditionalInfoMessage(recurring);
			setRecurring(recurring);
		}
	}, [startingDate, dueDate, weekDays, selectedRecurringType, firstMonthDay, lastMonthDay, setRecurring]);

	const OtherControlsMap: Record<RecurringType, JSX.Element> = {
		"OnlyOnce": <DateRange dueDate={dueDate} startingDate={startingDate} setDueDate={setDueDate} setStartingDate={setStartingDate} />,
		"Monthly": <DateRange dueDate={dueDate} startingDate={startingDate} setDueDate={setDueDate} setStartingDate={setStartingDate} />,
		"Weekly": <WeekDays days={weekDays} setDays={setWeekDays} />,
		"WholeMonth": <DateRange disabled startingDate={dateToShortISOString(firstMonthDay)} dueDate={dateToShortISOString(lastMonthDay)} setDueDate={setDueDate} setStartingDate={setStartingDate} />,
	};
	const RecurringInformation: Record<RecurringType, JSX.Element> = {
		"OnlyOnce": <FormattedMessage defaultMessage={`No recurring reward. Once the period is finished and reward is claimed reward won't be rescheduled again.`} />,
		"Monthly": <FormattedMessage defaultMessage={'The period set on the starting date and due date for the reward will be set again next month once it is claimed.'} />,
		"Weekly": <FormattedMessage defaultMessage={'The reward tasks will be scheduled for the selected week days, and set again on next week once the reward is claimed.'} />,
		"WholeMonth": <FormattedMessage defaultMessage={'The reward tasks will be scheduled for each day for the whole month and rescheduled again on next week once the reward is claimed.'} />,
	};

	return <div className={[commonStyle.field, style.recurring].join(" ")}>
		<label>Recurrence
			<div className={style.radio}>
				<Input
					label={intl.formatMessage({ defaultMessage: "Only Once" })}
					fieldClassName={style['recurring-field']}
					id={"OnlyOnce"}
					type="radio"
					name="recurring"
					value={"OnlyOnce"}
					checked={selectedRecurringType === "OnlyOnce"}
					onChange={handleOnChange}
				/>
				<Input
					label={intl.formatMessage({ defaultMessage: "Weekly" })}
					fieldClassName={style['recurring-field']}
					id={"Weekly"}
					type="radio"
					name="recurring"
					value={"Weekly"}
					checked={selectedRecurringType === "Weekly"}
					onChange={handleOnChange}
				/>
				<Input
					label={intl.formatMessage({ defaultMessage: "Monthly" })}
					fieldClassName={style['recurring-field']}
					id={"Monthly"}
					type="radio"
					name="recurring"
					value={"Monthly"}
					checked={selectedRecurringType === "Monthly"}
					onChange={handleOnChange}
				/>
				<Input
					label={intl.formatMessage({ defaultMessage: "Whole Month" })}
					fieldClassName={style['recurring-field']}
					id={"WholeMonth"}
					type="radio"
					name="recurring"
					value={"WholeMonth"}
					checked={selectedRecurringType === "WholeMonth"}
					onChange={handleOnChange}
				/>
			</div>
		</label>
		<div className={style['additional-information']}>{RecurringInformation[selectedRecurringType]}</div>
		{OtherControlsMap[selectedRecurringType]}
		<p className={[style['additional-information'], additionalInfo.type === "ERROR" ? style.error : null].filter(Boolean).join(" ")}>
			{additionalInfo.text}
		</p>
	</div>;
};

const DateRange = ({ startingDate, setStartingDate, dueDate, setDueDate, disabled = false }: { startingDate: string, setStartingDate: React.Dispatch<React.SetStateAction<string>>, dueDate: string, setDueDate: React.Dispatch<React.SetStateAction<string>>, disabled?: boolean }) => {
	const intl = useIntl();
	useEffect(() => {
		setStartingDate(startingDate);
		setDueDate(dueDate);
	}, []);
	return (
		<div className={style['date-range']}>
			<Input
				label={intl.formatMessage({ defaultMessage: "Starting Date" })}
				fieldClassName={style['recurring-field']}
				type="date"
				value={startingDate}
				onChange={e => setStartingDate(e.target.value)}
				placeholder={intl.formatMessage({ defaultMessage: "Starting Date" })}
				disabled={disabled}
			/>
			<Input
				label={intl.formatMessage({ defaultMessage: "Due Date" })}
				fieldClassName={style['recurring-field']}
				type="date"
				value={dueDate}
				onChange={e => setDueDate(e.target.value)}
				placeholder={intl.formatMessage({ defaultMessage: "Due Date" })}
				disabled={disabled}
			/>
		</div>);
};

const WeekDays = ({ days, setDays }: { days: string[], setDays: React.Dispatch<React.SetStateAction<string[]>> }) => {
	const { firstDayOfWeek } = useSelector((state: RootState) => state.settings);
	const intl = useIntl();
	const currentWeek = useMemo(() => {
		const currentDate = parseShortIsoString();
		const fullMonthDays = getFullMonthWithCompleteWeeks(currentDate.getMonth(), currentDate.getFullYear(), firstDayOfWeek);
		const { weeks, weekIndex } = splitDaysInWeeks(fullMonthDays, currentDate);
		return weeks[weekIndex];
	}, [firstDayOfWeek]);

	const handlerOnChange = ({ target: { checked, value } }: React.ChangeEvent<HTMLInputElement>) => {
		setDays(days => checked ? ([...days, value]) : (days.filter(day => day !== value)));
	};

	return <div className={style.weekdays}>
		{currentWeek
			.map((day: Date, idx: number) => <Input
				key={`${day?.getDay()}_${idx}`}
				fieldClassName={[style['checkbox-day'], style['recurring-field']].join(" ")}
				id={`${day?.getDay()}_${idx}`}
				type="checkbox"
				name="weekdays"
				value={dateToShortISOString(day)}
				label={intl.formatDate(day, { weekday: "short" })}
				onChange={handlerOnChange}
				checked={days?.includes(dateToShortISOString(day))}
			/>)
		}
	</div>;
};

export default Recurring;
