import { ReactNode, useState } from 'react';
import style from './Calendar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faTurnDown, faTurnLeftDown } from '@fortawesome/pro-duotone-svg-icons';
const CalendarViewTypes = ["daily", "weekly", "monthly", "flow"];
type CalendarViewType = typeof CalendarViewTypes[number];

// reuse this https://l-u-k-e.medium.com/lets-build-a-full-page-calendar-with-react-fb6f99412e6a 

interface ViewComponent { [key: CalendarViewType]: ReactNode }


function getDaysInMonth(month: number, year: number, fullGrid): Date[] {
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
  "daily": ({ dateSelected, onDayClick, tasks }) => <DailyView dateSelected={dateSelected} onDayClick={onDayClick} tasks={tasks} />,
  "weekly": ({ dateSelected, onDayClick, tasks }) => <WeeklyView dateSelected={dateSelected} onDayClick={onDayClick} tasks={tasks} />,
  "monthly": ({ dateSelected, onDayClick }) => (<MonthlyView dateSelected={dateSelected} onDayClick={onDayClick} />),
  "flow": ({ dateSelected, onDayClick }) => <FlowView dateSelected={dateSelected} onDayClick={onDayClick} />
};

export const Calendar = ({ date }: { date: Date }) => {
  const [view, setView] = useState<CalendarView>("daily");
  const [dateSelected, setDateSelected] = useState<Date>(date || new Date());

  const tasks = ["Make the bed", "Dress on time", "Shoes on time", "Brush your teeth", "Pack backpack", "Ready to go"];
  return <div>
    <header className={style.header}>
      <h2>{dateSelected.toDateString()}</h2>
      <select
        value={view}
        onChange={(evt) => setView(evt.target.value)}
      >
        {CalendarViewTypes
          .map(viewtype => <option key={viewtype} value={viewtype}>{viewtype}</option>)}
      </select>
    </header>
    <div className={style.calendar}>
      {viewMap[view]({ dateSelected, onDayClick: (date) => { setDateSelected(date); setView("daily"); }, tasks })}

    </div>
  </div>

};


const DailyView = ({ dateSelected, onDayClick, tasks }: { dateSelected: Date, onDayClick: () => void, tasks: string[] }) => {

  return (
    <div className={style['calendar-day']}>
      <h3>Daily {dateSelected.toLocaleString('default', { weekday: 'long', day: "numeric", month: 'long' })}</h3>

      {tasks.map(task => <div key={task} className={style['calendar-grid-day']}><span className={style.tasks}>{task}</span>
        <button
          className={`${style['daily-day']} ${style.button}`}
          onClick={() => dateSelected && onDayClick(dateSelected)}
        />
      </div>)}
    </div>
  )
}

const WeeklyView = ({ dateSelected, onDayClick, tasks }: { dateSelected: Date, onDayClick: () => void, tasks: string[] }) => {

  const weekDays = Array.from(Array(7).keys())
    .map(i => { const localDate = new Date(dateSelected.toISOString()); localDate.setDate(localDate.getDate() + i); return localDate; })
    .toSorted((dateA, dateB) => (dateA.getDay() - dateB.getDay()));

  return (
    <div className={style['calendar-week']}>
      <h3>Weekly {weekDays[0].toLocaleString('default', { day: "numeric", month: 'long' })} ~ {weekDays[6].toLocaleString('default', { day: "numeric", month: 'long' })}</h3>
      <div className={style['calendar-grid-week-header']}>
        <div className={style.tasks} />
        {weekDays.map(weekDay => <span className={style['calendar-week-weekday-label']} key={weekDay}>{weekDay.toLocaleDateString('default', { weekday: 'long', day: 'numeric' })}</span>)}
      </div>
      {tasks.map(task => <div key={task} className={style['calendar-grid-week']}><span className={style.tasks}>{task}</span>
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


const MonthlyView = ({ dateSelected, onDayClick }: { dateSelected: Date, onDayClick: () => void }) => {

  const days = getDaysInMonth(dateSelected.getMonth(), dateSelected.getFullYear(), true);

  const weekDays = Array.from(Array(7).keys())
    .map(i => { const localDate = new Date(dateSelected.toISOString()); localDate.setDate(localDate.getDate() + i); return localDate; })
    .toSorted((dateA, dateB) => (dateA.getDay() - dateB.getDay()))
    .map(date => date.toLocaleDateString('default', { weekday: 'long' }));



  return (
    <div className={style['calendar-month']}>
      <h3>Monthly {dateSelected.toLocaleString('default', { month: 'long' })}</h3>
      <div className={style['calendar-grid-month-header']}>
        {weekDays.map(weekDay => <span className={style['calendar-month-weekday-label']} key={weekDay}>{weekDay}</span>)}
      </div>
      <div className={style['calendar-grid-month']}>
        {
          days.map((day, idx) => (<button
            className={`${style['monthly-day']} ${style.button}`}
            key={`${idx}_${day?.getDay() || "Empty"}`}
            onClick={() => day && onDayClick(day)}
          >
            <span className={style['monthly-day-label']}>{day?.getDate() || ""}</span>
          </button>
          )
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

const FlowView = ({ dateSelected, onDayClick }: { dateSelected: Date, onDayClick: () => void }) => {
  const days = getDaysInMonth(dateSelected.getMonth(), dateSelected.getFullYear(), false);
  return (
    <>
      <h3>Flow</h3>
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
