import { useEffect, useRef, ReactNode, useState, cloneElement } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addAssessment } from "../../state/assessmentsSlice";
import { fetchParticipants } from "../../state/participantsSlice";
import { Participant } from '../../../core/domain/Participant';
import { DialogOption } from '../../../core/domain/DialogOption';
import { HelpCircle, XCircle, User } from 'react-feather';
import style from './ParticipantsAssessment.module.css';


interface ModalProps {
  openModal: boolean;
  closeModal: () => void;
  children: ReactNode;
  options: DialogOption[];
  handleSelectOption: () => void;
}


export const ParticipantsAssessment = ({ selectedDate, selectedTask, options }: { selectedDate: Date, selectedTask: Task, options: DialogOption[] }) => {

  const { participants } = useSelector((state) => state.participants);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchParticipants());
  }, []);

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [participantsVote, setParticipantsVote] = useState<Map<Participant, DialogOption | null>>(new Map(participants.map(participant => [participant, null])));

  const [participantSelected, selectParticipant] = useState<Participant | undefined>();


  useEffect(() => {
    setParticipantsVote(new Map(participants.map(participant => [participant, null])))
  }, [participants]);

  return <div className={style.participants}>
    {[...participantsVote.entries()].map(
      ([participant, dialogOption]) => (
        <div key={`${participant.id}_${dialogOption?.value ?? "NULL"}`} className={style['participant-vote']}>
          <ParticipantSwitch
            participant={participant}
            handleClick={
              () => {
                selectParticipant(participant);
                setModalOpen(true);
              }
            }
          />
          <div className={style['vote']}>
            {dialogOption ? dialogOption?.option : <HelpCircle />}
          </div>
        </div>
      )
    )}
    {modalOpen && (<Modal
      openModal={modalOpen}
      closeModal={() => { setModalOpen(false); }}
      handleSelectOption={(dialogOption: DialogOption) => {
        setParticipantsVote(new Map([...participantsVote.entries(), [participantSelected, dialogOption]]));

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

        selectParticipant();
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

