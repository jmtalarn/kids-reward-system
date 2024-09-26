import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { useTasksForDate } from '../../state/hooks/useTasksForDate';
import style from './Calendar.module.css';
import commonStyle from './Common.module.css';

import { ParticipantsAssessment } from '../components/ParticipantsAssessment';
import Button from '../components/Button';
import { dateToShortISOString, dateToLongLocaleString, parseShortIsoString } from '../../../core/domain/utils/date-utils';
import { fetchRewards } from '../../state/rewardsSlice';
import { Calendar as CalendarIcon, SkipBack, SkipForward, FastForward, Rewind, ChevronDown, Award } from 'react-feather';

import { setNewDate, setToday, forwardMonth, forwardDays, backwardDays, backwardMonth } from '../../state/dateSlice';
// import { Task } from '../../../core/domain/Task';
import { options } from '../../../core/domain/Options';
import { useElementOnScreen } from '../hooks/useIntersectionObserver';


function splitDaysInWeeks(days: Date[], selectedDate: Date) {
  const result = [];
  let j = 0;
  let selectedWeek;
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

function getFullMonthWithCompleteWeeks(month: number, year: number, weekStartDay = 0) {
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




export const Calendar = () => {
  const { date } = useSelector((state) => state.date);
  const { rewards } = useSelector((state) => state.rewards);
  const [viewFullMonth, setViewFullMonth] = useState(false);
  const dailyTasks = useTasksForDate();
  const dispatch = useDispatch();
  const [containerRef, isVisible] = useElementOnScreen({ initiallyVisible: true, options: { root: null, rootMargin: "0px", threshold: 0.1 } });
  const topRef = useRef();
  useEffect(() => { dispatch(fetchRewards()); }, []);

  const dateSelected = parseShortIsoString(date);

  const onDayClick = (dateClicked: Date) => {
    dispatch(setNewDate(dateToShortISOString(dateClicked)));
  };
  useEffect(() => { console.log({ isVisible }); }, [isVisible]);
  const fullMonthDays = getFullMonthWithCompleteWeeks(dateSelected.getMonth(), dateSelected.getFullYear(), 1);
  const { weeks, weekIndex } = splitDaysInWeeks(fullMonthDays, dateSelected);
  const days = viewFullMonth ? fullMonthDays : weeks[weekIndex];

  return <div style={{ position: "relative" }} ref={topRef}>
    <TodaysDateBanner visible={!isVisible} date={dateSelected} useRef={topRef} />
    <section className={`${style['calendar-container']} ${commonStyle.section}`} ref={containerRef}>
      <header className={style['calendar-month-header']}  >
        <Button
          className={style['move-date-button']}
          onClick={
            () => {
              dispatch(backwardMonth());
            }
          }
          title="Move the selected date to the previous month."
        >
          <SkipBack className={style['move-date-button-icon']} />
        </Button>
        <h3>
          {dateSelected.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
        <Button
          className={style['move-date-button']}
          onClick={
            () => {
              dispatch(forwardMonth());
            }
          }
          title="Move the selected date to the next month."
        >
          <SkipForward className={style['move-date-button-icon']} />
        </Button>
      </header>


      <div className={style['calendar-month']}>
        <MoveDateButtons />
        <div className={style['calendar-grid-week']}>
          {days.slice(0, 7).map(date => date.toLocaleDateString('default', { weekday: 'short' })).map(date => <span className={style['calendar-week-weekday-label']} key={date}>{date}</span>)}
        </div>


        <div className={style['calendar-grid-month']} >
          {
            weeks.map((week, idx) =>
              <div
                key={`week_${idx}`}
                className={[
                  style['calendar-grid-week'],
                  idx === weekIndex && style['current-week'],
                  idx !== weekIndex && !viewFullMonth ? style['hide-week'] : null,
                  viewFullMonth ? style['full-month'] : null
                ].filter(Boolean).join(" ")}
              >
                {week.map((day, idx) => {
                  //days.map((day, idx) => {
                  const classNames = [
                    style['monthly-day'],
                    style.button,
                    day.getDate() === dateSelected.getDate() && day.getMonth() === dateSelected.getMonth() ? style.today : null,
                    day.getMonth() === dateSelected.getMonth() ? style['current-month'] : null
                  ].filter(Boolean).join(' ');

                  return (day ? <button
                    className={classNames}
                    key={`${idx}_${day?.getDay() || "Empty"}`}
                    onClick={() => day && onDayClick(day)}
                  >
                    <span className={style['monthly-day-label']}>{day?.getDate() || ""}</span>
                  </button> : <span key={`${idx}_noday`} className={style['no-day']} />
                  );
                })}
              </div>
            )
          }
        </div>
        <button className={[style['view-full-month-button'], viewFullMonth ? style['view-full-month-button-expanded'] : null].filter(Boolean).join(" ")} onClick={() => { setViewFullMonth(viewFullMonth => !viewFullMonth); }}>
          <ChevronDown />
        </button>

      </div>
    </section >
    <hr />

    <section className={style['tasks-container']} >
      {
        dailyTasks?.map(task => <div key={`${task.id}_${task.order}`} className={style['task-participants']}>
          <div className={style.tasks}>
            <div className={style.task}>
              {task.description}
            </div>
            <div className={style.award} title={`Reward tasks are due on ${dateToLongLocaleString(new Date(rewards.byId[task.rewardId].dueDate))}`} >
              <Award color="gold" size="16" /> {rewards.byId[task.rewardId].description}
            </div>
          </div>

          <ParticipantsAssessment selectedDate={date} selectedTask={task} options={options} />

        </div>)
      }
    </section>

  </div>;

};

const MoveDateButtons = () => {
  const dispatch = useDispatch();

  return <div className={style['move-date-buttons']}>
    <Button
      className={style['move-date-button']}
      onClick={
        () => {
          dispatch(backwardDays(7));
        }
      }
      title="Move the selected date to a week before."
    >
      <Rewind className={style['move-date-button-icon']} />
    </Button>
    <div className={style['move-date-buttons-days']}>
      <Button
        className={style['move-date-button']}
        onClick={
          () => {
            dispatch(backwardDays(1));
          }
        }
        title="Move the selected date to a day before."
      >
        <SkipBack className={style['move-date-button-icon']} />
      </Button>
      <Button
        className={style['move-date-button']}
        onClick={() => dispatch(setToday())}
        title="Move the selected date to today."
      >
        <CalendarIcon className={style['move-date-button-icon']} />&nbsp;
        Today
      </Button>
      <Button
        className={style['move-date-button']}
        onClick={
          () => {
            dispatch(forwardDays(1));
          }
        }
        title="Move the selected date to a day after."
      >
        <SkipForward className={style['move-date-button-icon']} />
      </Button>
    </div>
    <Button
      className={style['move-date-button']}
      onClick={
        () => {
          dispatch(forwardDays(7));
        }
      }
      title="Move the selected date to a week after."
    >
      <FastForward className={style['move-date-button-icon']} />
    </Button>
  </div >;
};

const TodaysDateBanner = ({ visible, date, useRef }: { visible: boolean, date: Date, useRef: IntersectionObserver | null }) =>
(visible && <Button
  className={style['date-banner']}
  title="Click to go back to the date selection."
  onClick={() => useRef?.current?.scrollIntoView()}
>
  {dateToLongLocaleString(date)}
</Button>);

