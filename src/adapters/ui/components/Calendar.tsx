import { ReactNode, useState, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { useTasksForDate } from '../../state/hooks/useTasksForDate';
import style from './Calendar.module.css';
import commonStyle from './Common.module.css';

import { ParticipantsAssessment } from '../components/ParticipantsAssessment'
import Button from '../components/Button'
import { dateToShortISOString, dateToLongLocaleString } from '../../../core/domain/utils/date-utils';
import { Calendar as CalendarIcon, SkipBack, SkipForward, CornerLeftDown, CornerRightDown, ArrowLeft, ArrowRight, Award } from 'react-feather';
import Select from '../components/Select'
import { setNewDate, setToday, forwardMonth, forwardDays, backwardDays, backwardMonth } from '../../state/dateSlice';

import { Task } from '../../../core/domain/Task';
import { options } from '../../../core/domain/Options';

const CalendarViewTypes = ["daily", "weekly", "monthly", "flow"];
type CalendarViewType = typeof CalendarViewTypes[number];


interface ViewComponent { [key: CalendarViewType]: ReactNode }

function getDaysInFlow(startDate, length): Date[] {
  const dates = [startDate];
  for (let i = 1; i < length; i++) {
    const localDate = new Date(dates[i - 1].toISOString());
    localDate.setDate(localDate.getDate() + 1);
    dates.push(localDate);
  }
  return dates;
}

function getDaysInMonth(month: number, year: number, fullGrid: boolean): Date[] {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  if (fullGrid) {
    return Array(days[0].getDay()).fill(null).concat(days).concat(Array(6 - days[days.length - 1].getDay()).fill(null));
  }
  else {
    return days;
  }
}


const viewMap: ViewComponent =
{
  "daily": ({ onDayClick, tasks }) => <DailyView onDayClick={onDayClick} tasks={tasks} />,
  "weekly": ({ onDayClick, tasks }) => <WeeklyView onDayClick={onDayClick} tasks={tasks} />,
  "monthly": ({ onDayClick }) => (<MonthlyView onDayClick={onDayClick} />),
  "flow": ({ onDayClick }) => <FlowView onDayClick={onDayClick} />
};

export const Calendar = () => {

  const dailyTasks = useTasksForDate();

  const dispatch = useDispatch();

  const [view, setView] = useState<CalendarView>("daily");

  return <section className={`${style['calendar-container']} ${commonStyle.section}`}>
    <header className={style.header}>
      <h3 className={style['view-selected']}>{view}</h3>
      <Select
        value={{ value: view, label: view }}
        onChange={({ value }) => setView(value)}
        options={CalendarViewTypes
          .map(viewtype => ({ value: viewtype, label: viewtype }))
        }
      />
    </header>
    <div className={style.calendar}>
      {viewMap[view](
        {
          onDayClick: (date) => {
            dispatch(setNewDate(dateToShortISOString(date)));
            setView("daily");
          },
          tasks: dailyTasks
        }
      )
      }
    </div>
  </section>

};

const MoveDateButtons = ({ offset }: { offset: 1 | 7 | "month" }) => {
  const dispatch = useDispatch();

  return <div className={style['move-date-buttons']}>
    <Button
      className={style['move-date-button']}
      onClick={
        () => {
          if (offset === "month") {
            dispatch(backwardMonth());
          } else {
            dispatch(backwardDays(offset));
          }
        }
      }
    >
      <SkipBack className={style['move-date-button-icon']} />
    </Button>
    <Button
      className={style['move-date-button']}
      onClick={() => dispatch(setToday())}
    >
      <CalendarIcon className={style['move-date-button-icon']} />&nbsp;
      Today
    </Button>
    <Button
      className={style['move-date-button']}
      onClick={
        () => {
          if (offset === "month") {
            dispatch(forwardMonth());
          } else {
            dispatch(forwardDays(offset));
          }
        }
      }
    >
      <SkipForward className={style['move-date-button-icon']} />
    </Button>
  </div >
}

const DailyView = ({ tasks }: { tasks: Task[] }) => {
  const { date } = useSelector((state) => state.date);
  const { rewards } = useSelector((state) => state.rewards);
  const dateSelected = useMemo(() => new Date(date), [date]);
  return (
    <div className={style['calendar-day']}>
      <header className={style['calendar-day-header']} >
        <h3>
          {dateToLongLocaleString(dateSelected)}
        </h3>
        <MoveDateButtons offset={1} />
      </header >

      {
        tasks && tasks.map(task => <div key={`${task.id}_${task.order}`} className={style['calendar-grid-day']}>
          <div className={style.tasks}>
            <div className={style.task}>
              {task.description}
            </div>
            <div className={style.award} title={`Reward tasks are due on ${dateToLongLocaleString(new Date(rewards.byId[task.rewardId].dueDate))}`} >
              <Award color="gold" size="16" /> {rewards.byId[task.rewardId].description}
            </div>
          </div>
          <div className={`${style['daily-day']} `}>
            <ParticipantsAssessment selectedTask={task} options={options} />
          </div>
        </div>)
      }
    </div >
  )
}

const WeeklyView = ({ onDayClick, tasks }: { onDayClick: () => void, tasks: string[] }) => {
  const { date } = useSelector((state) => state.date);
  const dateSelected = new Date(date);

  const weekDays = Array(7);
  weekDays[dateSelected.getDay()] = dateSelected;
  let j = 0;
  for (let i = dateSelected.getDay(); i > 0; i--) {
    j = j + 1;
    const localDate = new Date(dateSelected.toISOString());
    localDate.setDate(localDate.getDate() - j);
    weekDays[localDate.getDay()] = localDate;
  }
  j = 0;
  for (let i = dateSelected.getDay() + 1; i <= 7; i++) {
    const localDate = new Date(dateSelected.toISOString());
    localDate.setDate(localDate.getDate() + j);
    j = j + 1;
    weekDays[localDate.getDay()] = localDate;
  }


  return (
    <div className={style['calendar-week']}>
      <header className={style['calendar-week-header']}>
        <h3>{dateToLongLocaleString(weekDays[0])} ~ {dateToLongLocaleString(weekDays[6])} </h3>
        <MoveDateButtons offset={7} />
      </header>
      <div className={style['calendar-grid-week-header']}>
        <div className={style.tasks} />
        {weekDays.map(weekDay => <span className={style['calendar-week-weekday-label']} key={weekDay}>{dateToLongLocaleString(weekDay)}</span>)}
      </div>
      {tasks.map(task => <div key={`${task.id}_${task.order}`} className={style['calendar-grid-week']}><span className={style.tasks}>{task.description}</span>
        {
          weekDays.map(
            (day, idx) => (
              <button
                className={`${style['weekly-day']} ${style.button}`}
                key={`${idx}_${day?.getDay() || "Empty"}`}
                onClick={() => day && onDayClick(day)}
              >
              </button>
            )
          )
        }
      </div>)}
    </div>
  )
}


const MonthlyView = ({ onDayClick }: { onDayClick: () => void }) => {
  const { date } = useSelector((state) => state.date);
  const dateSelected = new Date(date);
  const days = getDaysInMonth(dateSelected.getMonth(), dateSelected.getFullYear(), true);

  const weekDays = Array.from(Array(7).keys())
    .map(i => { const localDate = new Date(dateSelected.toISOString()); localDate.setDate(localDate.getDate() + i); return localDate; })
    .toSorted((dateA, dateB) => (dateA.getDay() - dateB.getDay()))
    .map(date => date.toLocaleDateString('default', { weekday: 'long' }));



  return (
    <div className={style['calendar-month']}>
      <header className={style['calendar-month-header']}>
        <h3>{dateSelected.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
        <MoveDateButtons offset={'month'} />
      </header>
      <div className={style['calendar-grid-month-header']}>
        {weekDays.map(weekDay => <span className={style['calendar-month-weekday-label']} key={weekDay}>{weekDay}</span>)}
      </div>
      <div className={style['calendar-grid-month']}>
        {
          days.map((day, idx) => {
            const classNames = [style['monthly-day'], style.button].join(' ');

            return (day ? <button
              className={classNames}
              key={`${idx}_${day?.getDay() || "Empty"}`}
              onClick={() => day && onDayClick(day)}
            >
              <span className={style['monthly-day-label']}>{day?.getDate() || ""}</span>
            </button> : <span key={`${idx}_noday`} className={style['no-day']} />
            )
          }
          )
        }
      </div >
    </div>
  )
}

const arrow = (idx) => {

  if (idx % 6 === 5) {
    return (
      <span key={`arrow_${idx}`} className={`${style.arrow} ${style['turn-down']}`
      }>
        <CornerLeftDown />
      </span>
    )
  }
  if (idx % 3 === 2) {
    return (
      <span key={`arrow_${idx}`} className={`${style.arrow} ${style['turn-down']}`
      }>
        <CornerRightDown />
      </span>
    )
  }
  if (idx % 6 === 3 || idx % 6 === 4) {
    return (
      <span key={`arrow_${idx}`} className={`${style.arrow}`
      }>
        <ArrowLeft className={`${style.arrow}`} />
      </span>
    )
  }

  return (
    <span key={`arrow_${idx}`} className={`${style.arrow}`
    }>
      <ArrowRight className={`${style.arrow}`} />
    </span>
  )
}

const FlowView = ({ onDayClick }: { onDayClick: () => void }) => {
  const { date } = useSelector((state) => state.date);
  const dateSelected = new Date(date);

  const days = getDaysInFlow(dateSelected, 25);
  return (
    <>
      <header className={style['calendar-flow-header']}>
        <h3>Starts on {dateToLongLocaleString(dateSelected)}</h3><MoveDateButtons offset={1} />
      </header>
      <div className={style['calendar-grid-flow']}>
        {
          days.map((day, idx) => {
            const button = <button
              className={`${style.button} ${style['flow-day']} `}
              key={`${idx}_${day?.getDay() || "Empty"}`}
              onClick={() => day && onDayClick(day)}
            >
              <span className={style['flow-day-label']}>{day?.getDate() || ""}</span >
            </button>;

            const arrowSign = idx !== days.length - 1 ? arrow(idx) : null;

            return [button, arrowSign];

          }).flat()
        }
      </div>
    </>
  )
}
