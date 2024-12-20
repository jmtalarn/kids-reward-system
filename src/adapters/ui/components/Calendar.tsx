import { useEffect, useRef, useState, type RefObject } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useTasksForDate } from '../../state/hooks/useTasksForDate';
import { AppDispatch, RootState } from '../../state/store';
import style from './Calendar.module.css';
import commonStyle from './Common.module.css';

import { Award, Calendar as CalendarIcon, ChevronDown, FastForward, Rewind, SkipBack, SkipForward } from 'react-feather';
import { dateToShortISOString, getFullMonthWithCompleteWeeks, parseShortIsoString, splitDaysInWeeks } from '../../../core/domain/utils/date-utils';
import { fetchRewards } from '../../state/rewardsSlice';
import Button from '../components/Button';
import { ParticipantsAssessment } from '../components/ParticipantsAssessment';

import { backwardDays, backwardMonth, forwardDays, forwardMonth, setNewDate, setToday } from '../../state/dateSlice';

import { FormattedDate, useIntl } from 'react-intl';


import { options } from '../../../core/domain/Options';
import type { Task } from '../../../core/domain/Task';
import { useElementOnScreen } from '../hooks/useIntersectionObserver';
import { getRewardDueDate } from '../../../core/domain/utils/reward-utils';
import { getFirstDayOfWeek } from '../../state/settingsSlice';






export const Calendar = () => {
  const { date } = useSelector((state: RootState) => state.date);
  const { firstDayOfWeek } = useSelector((state: RootState) => state.settings);
  const { rewards } = useSelector((state: RootState) => state.rewards);
  const [viewFullMonth, setViewFullMonth] = useState(false);
  const dailyTasks = useTasksForDate();
  const dispatch = useDispatch<AppDispatch>();
  const { containerRef, isVisible } = useElementOnScreen({ initiallyVisible: true, options: { root: null, rootMargin: "0px", threshold: 0.1 } });
  const topRef = useRef<HTMLDivElement>(null);
  const intl = useIntl();

  useEffect(() => {
    dispatch(fetchRewards());
    dispatch(getFirstDayOfWeek());
  }, []);

  const dateSelected = parseShortIsoString(date);

  const onDayClick = (dateClicked: Date) => {
    dispatch(setNewDate(dateToShortISOString(dateClicked)));
  };

  const fullMonthDays = getFullMonthWithCompleteWeeks(dateSelected.getMonth(), dateSelected.getFullYear(), firstDayOfWeek);
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
          title={intl.formatMessage({ defaultMessage: 'Move the selected date to the previous month.' })}
        >
          <SkipBack className={style['move-date-button-icon']} />
        </Button>
        <h3>
          <FormattedDate value={dateSelected} year="numeric" month="long" />
        </h3>
        <Button
          className={style['move-date-button']}
          onClick={
            () => {
              dispatch(forwardMonth());
            }
          }
          title={intl.formatMessage({ defaultMessage: 'Move the selected date to the next month.' })}
        >
          <SkipForward className={style['move-date-button-icon']} />
        </Button>
      </header>


      <div className={style['calendar-month']}>
        <MoveDateButtons />
        <div className={style['calendar-grid-week']}>
          {days.slice(0, 7).map(date => intl.formatDate(date, { weekday: "short" })).map(date => <span className={style['calendar-week-weekday-label']} key={date}>{date}</span>)}
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
        dailyTasks?.map((task: Task) => <div key={`${task.id}_${task.order}`} className={style['task-participants']}>
          <div className={style.tasks}>
            <div className={style.task}>
              {task.description}
            </div>
            <div className={style.award} title={getRewardDueDate(rewards.byId[task.rewardId]) ? intl.formatMessage({ defaultMessage: 'Reward tasks are due on {dueDate}' }, { dueDate: intl.formatDate(getRewardDueDate(rewards.byId[task.rewardId]), { dateStyle: 'full' }) }) : ''} >
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
  const dispatch = useDispatch<AppDispatch>();
  const intl = useIntl();
  return <div className={style['move-date-buttons']}>
    <Button
      className={style['move-date-button']}
      onClick={
        () => {
          dispatch(backwardDays(7));
        }
      }
      title={intl.formatMessage({ defaultMessage: 'Move the selected date to a week before.' })}
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
        title={intl.formatMessage({ defaultMessage: 'Move the selected date to a day before.' })}
      >
        <SkipBack className={style['move-date-button-icon']} />
      </Button>
      <Button
        className={style['move-date-button']}
        onClick={() => dispatch(setToday())}
        title="Move the selected date to today."
      >
        <CalendarIcon className={style['move-date-button-icon']} />&nbsp;
        {intl.formatMessage({ defaultMessage: 'Today' })}
      </Button>
      <Button
        className={style['move-date-button']}
        onClick={
          () => {
            dispatch(forwardDays(1));
          }
        }
        title={intl.formatMessage({ defaultMessage: 'Move the selected date to a day after.' })}
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
      title={intl.formatMessage({
        defaultMessage: 'Move the selected date to a week after.'
      })}
    >
      <FastForward className={style['move-date-button-icon']} />
    </Button>
  </div >;
};

const TodaysDateBanner = ({ visible, date, useRef }: { visible: boolean, date: Date, useRef: RefObject<HTMLDivElement> | null }) => {
  const intl = useIntl();
  return (visible && <Button
    className={style['date-banner']}
    title={intl.formatMessage({
      defaultMessage: 'Click to go back to the date selection.'
    })}
    onClick={() => useRef?.current?.scrollIntoView({ block: 'start', behavior: 'smooth' })}
  >
    {intl.formatDate(date, { dateStyle: 'full' })}
  </Button>);
};

