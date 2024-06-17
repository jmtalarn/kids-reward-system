import { useEffect, useRef, ReactNode, useState } from 'react';
import { faCircleXmark, faUser, faCircleQuestion } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Participant } from '../../../core/domain/Participant';
import { useConfigContext } from '../context/ConfigContext';

import style from './ParticipantsAssessment.module.css';
// Define the props type

interface DialogOption {
  option: ReactNode;
  value: string;
  //  action: () => void;
}

interface ModalProps {
  openModal: boolean;
  closeModal: () => void;
  children: ReactNode;
  options: DialogOption[];
  handleSelectOption: () => void;
}


const ParticipantsAssessment = ({ selectedTask, options }: { selectedTask: Task, options: DialogOption[] }) => {

  const { config: { participants } } = useConfigContext();

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [participantsVote, setParticipantsVote] = useState<Map<Participant, DialogOption | null>>(new Map(participants.map(participant => [participant, null])));

  const [participantSelected, selectParticipant] = useState<Participant | undefined>();


  useEffect(() => {
    setParticipantsVote(new Map(participants.map(participant => [participant, null])))
  }, [participants]);
  console.log({ modalOpen })
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
            {dialogOption ? dialogOption?.option : <FontAwesomeIcon icon={faCircleQuestion} />}
          </div>
        </div>
      )
    )}
    {modalOpen && (<Modal
      openModal={modalOpen}
      closeModal={() => { setModalOpen(false); }}
      handleSelectOption={(dialogOption: DialogOption) => {
        setParticipantsVote(new Map([...participantsVote.entries(), [participantSelected, dialogOption]]));
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
          <FontAwesomeIcon icon={faCircleXmark} />
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
    {dialogOption.option}
  </button>
);

const ParticipantSwitch = ({ participant, handleClick }: { participant: Participant, handleClick: () => void }) =>
(<button className={style['option-button']} onClick={handleClick} >
  <FontAwesomeIcon style={{ color: participant.color }} icon={faUser} /> {participant.name}
</button>)

export default ParticipantsAssessment;
