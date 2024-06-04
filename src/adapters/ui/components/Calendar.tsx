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

export const Calendar = ({ date }: { date: Date }) => {
  const [view, setView] = useState<CalendarView>("daily");
  const [dateSelected, setDateSelected] = useState<Date>(date || new Date());




  const viewMap: ViewComponent =
  {
    "daily": () => <h3>Daily</h3>,
    "weekly": () => <h3>Weekly</h3>,
    "monthly": ({ dateSelected, onDayClick }) => (<>
      <h3>Monthly</h3>
      <MonthlyView dateSelected={dateSelected} onDayClick={onDayClick} />
    </>),
    "flow": ({ dateSelected, onDayClick }) => <><h3>Flow</h3><FlowView dateSelected={dateSelected} onDayClick={onDayClick} /></>
  };
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
      {viewMap[view]({ dateSelected, onDayClick: (date) => { setDateSelected(date); setView("daily"); } })}

    </div>
  </div>

};

const MonthlyView = ({ dateSelected, onDayClick }: { dateSelected: Date, onDayClick: () => void }) => {

  const days = getDaysInMonth(dateSelected.getMonth(), dateSelected.getFullYear(), true);
  return <div className={style['calendar-grid-month']}>
    {
      days.map((day, idx) => (<button
        className={`${style.day} ${style.button}`}
        key={`${idx}_${day?.getDay() || "Empty"}`}
        onClick={() => day && onDayClick(day)}
      >
        {day?.getDate() || ""}
      </button>
      )
      )
    }
  </div >
}

const arrow = (idx) => {
  console.log(idx, idx % 3, idx % 6)
  if (idx % 6 === 5) {
    return <FontAwesomeIcon icon={faTurnLeftDown} />
  }
  if (idx % 3 === 2) {
    return <FontAwesomeIcon icon={faTurnDown} />
  }
  if (idx % 6 === 3 || idx % 6 === 4) {
    return <FontAwesomeIcon icon={faArrowLeft} />
  }

  return <FontAwesomeIcon icon={faArrowRight} />
}

const FlowView = ({ dateSelected, onDayClick }: { dateSelected: Date, onDayClick: () => void }) => {
  const days = getDaysInMonth(dateSelected.getMonth(), dateSelected.getFullYear(), false);
  return <div className={style['calendar-grid-flow']}>
    {
      days.map((day, idx) => (<><button
        className={`${style['flow-day']} ${style.day} ${style.button}`}
        key={`${idx}_${day?.getDay() || "Empty"}`}
        onClick={() => day && onDayClick(day)}
      >
        {day?.getDate() || ""}
      </button>
        {idx !== days.length - 1 && <span className={style.arrow}>
          {arrow(idx)}
        </span>}
      </>
      )
      )
    }
  </div>
}
