import { useEffect, useMemo, useRef, useState } from 'react';
import { Settings as SettingsIcon, XCircle } from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';

import { useDispatch, useSelector } from 'react-redux';
import { Percentage, type DayOfWeek, type SettingsType } from '../../../core/domain/Settings';
import type { AppDispatch, RootState } from '../../state/store';
import Button from './Button';
import Input from './Input';
import LanguageSelector from './LanguageSelector';
import Select from './Select';
import style from './Settings.module.css';
import { getClaimingConfirmationThreshold, getFirstDayOfWeek, getLang, setClaimingConfirmationThreshold, setFirstDayOfWeek } from '../../state/settingsSlice';

interface ModalProps {
  openModal: boolean;
  closeModal: () => void;
  settings: SettingsType
}


export const Settings = () => {

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const settings = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getFirstDayOfWeek());
    dispatch(getLang());
    dispatch(getClaimingConfirmationThreshold());
  }, []);

  return <>
    <Button className={style['settings-button']}
      onClick={() => setTimeout(() => setModalOpen(true), 150)}><SettingsIcon />
    </Button>
    {modalOpen && (<Modal
      openModal={modalOpen}
      closeModal={() => { setModalOpen(false); }}
      settings={settings}
    />)
    }
  </>;

};
// Modal as a separate component
const Modal: React.FC<ModalProps> = ({ openModal, closeModal, settings }) => {
  const [threshold, setThreshold] = useState<Percentage>(settings.claimingConfirmationThreshold);
  const [firstWeekDay, setFirstWeekDay] = useState<DayOfWeek>(settings.firstDayOfWeek);

  const ref = useRef<HTMLDialogElement>(null);
  const intl = useIntl();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  const weekDaysOptions = useMemo(() => [
    { value: 0, label: intl.formatMessage({ defaultMessage: "Sunday" }) },
    { value: 1, label: intl.formatMessage({ defaultMessage: "Monday" }) },
    { value: 2, label: intl.formatMessage({ defaultMessage: "Tuesday" }) },
    { value: 3, label: intl.formatMessage({ defaultMessage: "Wednesday" }) },
    { value: 4, label: intl.formatMessage({ defaultMessage: "Thursday" }) },
    { value: 5, label: intl.formatMessage({ defaultMessage: "Friday" }) },
    { value: 6, label: intl.formatMessage({ defaultMessage: "Saturday" }) },
  ], [intl]);

  useEffect(() => { dispatch(setFirstDayOfWeek(firstWeekDay)); }, [firstWeekDay, dispatch]);
  useEffect(() => { dispatch(setClaimingConfirmationThreshold(threshold)); }, [threshold, dispatch]);

  return (
    <dialog ref={ref} className={style.dialog} onCancel={closeModal}>
      <header className={style.header}>
        <h3><FormattedMessage defaultMessage={'Settings'} /></h3>
        <button className={style['close-button']} onClick={closeModal}>
          <XCircle />
        </button>
      </header>
      <div className={style.content}>
        <div className={style.field}>
          <LanguageSelector />
          <div className={style.threshold}>
            <Input type="range" min="0" max="100" step="1"
              value={threshold}
              label={intl.formatMessage({ defaultMessage: "Claiming reward threshold confirmation" })}
              onChange={evt => {
                setThreshold(parseInt(evt.target.value, 10) as Percentage);
              }
              }
            >
              <span className={style.information}>
                <FormattedMessage
                  defaultMessage={'Percentage of the total to asking for confirmation on claiming the reward.'}
                />
              </span>
            </Input>
          </div>
          <div className={style.weekday}>
            <Select
              label={intl.formatMessage({ defaultMessage: "First day of the week" })}
              isSearchable={false}
              isClearable={false}
              value={weekDaysOptions[firstWeekDay]}
              onChange={(weekday) => {
                setFirstWeekDay(weekday?.value as DayOfWeek);
              }}
              options={weekDaysOptions}
            />

          </div>
        </div>
      </div>
    </dialog >
  );
};



