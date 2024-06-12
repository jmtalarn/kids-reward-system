import { ReactNode, useState } from 'react';
import style from './Calendar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faTurnDown, faTurnLeftDown, faBackward, faForward, faCalendarDay } from '@fortawesome/pro-duotone-svg-icons';
const CalendarViewTypes = ["daily", "weekly", "monthly", "flow"];
type CalendarViewType = typeof CalendarViewTypes[number];
import { Participant } from '../../../core/domain/Participant';

import Button from '../components/Button'
import { useDateContext } from '../context/DateContext';
import { useConfigContext } from '../context/ConfigContext';
import { Task } from '../../../core/domain/Task';

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
  const { config: { participants, dailyTasks: tasks } } = useConfigContext();
  const { setNewDate } = useDateContext();

  const [view, setView] = useState<CalendarView>("daily");

  return <div className={style['calendar-container']}>
    <header className={style.header}>
      <h2 className={style['view-selected']}>{view}</h2>
      <select
        value={view}
        onChange={(evt) => setView(evt.target.value)}
      >
        {CalendarViewTypes
          .map(viewtype => <option key={viewtype} value={viewtype}>{viewtype}</option>)}
      </select>
    </header>
    <div className={style.calendar}>
      {viewMap[view]({ onDayClick: (date) => { setNewDate(date); setView("daily"); }, tasks })}

    </div>
  </div>

};

const MoveDateButtons = ({ offset }: { offset: 1 | 7 | "month" }) => {
  const { setToday, forwardMonth, forwardDays, backwardDays, backwardMonth } = useDateContext();

  return <div className={style['move-date-buttons']}>
    <Button
      className={style['move-date-button']}
      onClick={
        () => {
          if (offset === "month") {
            backwardMonth();
          } else {
            backwardDays(offset);
          }
        }
      }
    >
      <FontAwesomeIcon icon={faBackward} />
    </Button>
    <Button
      className={style['move-date-button']}
      onClick={() => setToday()}
    >
      <>
        <FontAwesomeIcon icon={faCalendarDay} /> Today
      </>
    </Button>
    <Button
      className={style['move-date-button']}
      onClick={
        () => {
          if (offset === "month") {
            forwardMonth();
          } else {
            forwardDays(offset);
          }
        }
      }
    >
      <FontAwesomeIcon icon={faForward} />
    </Button>
  </div >
}

const DailyView = ({ onDayClick, tasks }: { onDayClick: () => void, tasks: Task[] }) => {
  const { date: dateSelected } = useDateContext();
  return (
    <div className={style['calendar-day']}>
      <header className={style['calendar-day-header']} >
        <h3>
          {dateSelected.toLocaleString('default', { weekday: 'long', day: "numeric", month: 'long' })}
        </h3>
        <MoveDateButtons offset={1} />
      </header >

      {
        tasks.map(task => <div key={`${task.id}_${task.order}`} className={style['calendar-grid-day']}><span className={style.tasks}>{task.description}</span>
          <button
            className={`${style['daily-day']} ${style.button}`}
            onClick={() => dateSelected && onDayClick(dateSelected)}
          />
        </div>)
      }
    </div >
  )
}

const WeeklyView = ({ onDayClick, tasks }: { onDayClick: () => void, tasks: string[] }) => {
  const { date: dateSelected } = useDateContext();

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
        <h3>{weekDays[0].toLocaleString('default', { day: "numeric", month: 'long', year: 'numeric' })} ~ {weekDays[6].toLocaleString('default', { day: "numeric", month: 'long', year: 'numeric' })} </h3>
        <MoveDateButtons offset={7} />
      </header>
      <div className={style['calendar-grid-week-header']}>
        <div className={style.tasks} />
        {weekDays.map(weekDay => <span className={style['calendar-week-weekday-label']} key={weekDay}>{weekDay.toLocaleDateString('default', { weekday: 'long', day: 'numeric' })}</span>)}
      </div>
      {tasks.map(task => <div key={`${task.id}_${task.order}`} className={style['calendar-grid-week']}><span className={style.tasks}>{task.description}</span>
        {
          weekDays.map((day, idx) => (<button
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
  const { date: dateSelected } = useDateContext();

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
        <FontAwesomeIcon icon={faTurnLeftDown} />
      </span>
    )
  }
  if (idx % 3 === 2) {
    return (
      <span key={`arrow_${idx}`} className={`${style.arrow} ${style['turn-down']}`
      }>
        <FontAwesomeIcon icon={faTurnDown} />
      </span>
    )
  }
  if (idx % 6 === 3 || idx % 6 === 4) {
    return (
      <span key={`arrow_${idx}`} className={`${style.arrow}`
      }>
        <FontAwesomeIcon className={`${style.arrow}`} icon={faArrowLeft} />
      </span>
    )
  }

  return (
    <span key={`arrow_${idx}`} className={`${style.arrow}`
    }>
      <FontAwesomeIcon className={`${style.arrow}`} icon={faArrowRight} />
    </span>
  )
}

const FlowView = ({ onDayClick }: { onDayClick: () => void }) => {
  const { date: dateSelected } = useDateContext();

  const days = getDaysInFlow(dateSelected, 25);
  return (
    <>
      <header className={style['calendar-flow-header']}>
        <h3>Starts on {dateSelected.toLocaleString('default', { weekday: 'long', day: "numeric", month: 'long' })}</h3><MoveDateButtons offset={1} />
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
