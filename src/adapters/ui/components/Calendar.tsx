import { ReactNode, useState } from 'react';
import style from './Calendar.module.css';

const CalendarViewTypes = ["daily", "weekly", "monthly", "flow"];
type CalendarViewType = typeof CalendarViewTypes[number];


interface ViewComponent { [key: CalendarViewType]: ReactNode }

export const Calendar = () => {
  const [view, setView] = useState<CalendarView>("daily");

  const viewMap: ViewComponent = {
    "daily": <h3>Daily</h3>, "weekly": <h3>Weekly</h3>, "monthly": <h3>Monthly</h3>, "flow": <h3>Flow</h3>
  };
  return <div>
    <header>
      <select
        onChange={(evt) => setView(evt.target.value)}
      >
        {CalendarViewTypes
          .map(viewtype => <option key={viewtype} value={viewtype}>{viewtype}</option>)}
      </select>
    </header>
    <div className={style.calendar}>
      {viewMap[view]}
    </div>
  </div>

};
