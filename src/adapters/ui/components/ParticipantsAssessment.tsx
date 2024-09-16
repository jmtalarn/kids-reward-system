import { useEffect, useRef, ReactNode, useState, cloneElement } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addAssessment, fetchAssessments } from "../../state/assessmentsSlice";
import { fetchParticipants } from "../../state/participantsSlice";
import { Participant } from '../../../core/domain/Participant';
import { DialogOption } from '../../../core/domain/DialogOption';
import { ValueOptionMap } from '../../../core/domain/Options';
import { HelpCircle, XCircle, User } from 'react-feather';
import style from './ParticipantsAssessment.module.css';


interface ModalProps {
  openModal: boolean;
  closeModal: () => void;
  children: ReactNode;
  options: DialogOption[];
  handleSelectOption: () => void;
}


export const ParticipantsAssessment = ({ selectedDate, selectedTask, options }: { selectedDate: string, selectedTask: Task, options: DialogOption[] }) => {

  const { participants } = useSelector((state) => state.participants);
  const { assessments } = useSelector((state) => state.assessments);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchParticipants());
    dispatch(fetchAssessments());
  }, []);

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [participantSelected, setParticipantSelected] = useState<Participant | undefined>();

  return <div className={style.participants}>
    {participants.map(participant => {
      const optionValue = assessments?.[selectedDate]?.[participant.id]?.[selectedTask.id];
      const dialogOption = (optionValue !== null && optionValue !== undefined) ? ({ option: ValueOptionMap[optionValue], value: optionValue }) : {};

      return (<div key={`${participant.id}_${dialogOption?.value ?? "NULL"}`} className={style['participant-vote']}>
        <ParticipantSwitch
          participant={participant}
          handleClick={
            () => {
              setParticipantSelected(participant);
              setModalOpen(true);
            }
          }
        />
        <div className={style['vote']}>
          {dialogOption?.option || <HelpCircle />}
        </div>
      </div>)
    })}

    {modalOpen && (<Modal
      openModal={modalOpen}
      closeModal={() => { setModalOpen(false); }}
      handleSelectOption={(dialogOption: DialogOption) => {
        //setParticipantsVote(new Map([...participantsVote.entries(), [participantSelected, dialogOption]]));

        dispatch(
          addAssessment(
            {
              date: selectedDate,
              participantId: participantSelected.id,
              taskId: selectedTask.id,
              option: dialogOption
            }
          )
        );

        setParticipantSelected();
        setModalOpen(false);
      }}
      options={options}>
      <div className={style['assessment-content']}>
        How did {participantSelected.name} went for {selectedTask.description} ?
      </div>
    </Modal>)}
  </div>
}
// Modal as a separate component
const Modal: React.FC<ModalProps> = ({ openModal, closeModal, children, options, handleSelectOption }) => {

  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <dialog ref={ref} className={style.dialog} onCancel={closeModal}>
      <header className={style.header}>
        <button className={style['close-button']} onClick={closeModal}>
          <XCircle />
        </button>
      </header>
      <div className={style.options}>
        {(options.map((option, idx) => (
          <Option
            key={"key_" + idx}
            dialogOption={option}
            onClick={
              () => {
                handleSelectOption(option);
              }
            }
          />
        )))
        }

      </div>
      <div className={style.content}>{children}</div>
    </dialog>
  );
};

const Option = ({ dialogOption, onClick }: { dialogOption: DialogOption, onClick: () => void }) => (
  <button className={style['option-button']} onClick={onClick}>
    {cloneElement(dialogOption.option, { style: { ...dialogOption.option.props.style, width: "4rem" } })}
  </button>
);

const ParticipantSwitch = ({ participant, handleClick }: { participant: Participant, handleClick: () => void }) =>
(<button className={style['participant-switch']} onClick={handleClick} >
  <User style={{ color: participant.color }} /> {participant.name}
</button>)

