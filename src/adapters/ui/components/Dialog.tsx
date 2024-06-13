import { useEffect, useRef, ReactNode, useState } from 'react';
import { faCircleXmark, faUser, faCircleQuestion } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Participant } from '../../../core/domain/Participant';

import style from './Dialog.module.css';
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
  participants: Participant[];
}

// Modal as a separate component
const Modal: React.FC<ModalProps> = ({ openModal, closeModal, children, options, participants }) => {
  const [participantSelected, selectParticipant] = useState<Participant | undefined>();

  const [participantsVote, setParticipantsVote] = useState<Map<Participant, Vote | null>>(new Map(participants.map(participant => [participant, null])));

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
        {participantSelected ?
          (options.map((option, idx) => (
            <Option
              key={"key_" + idx}
              dialogOption={option}
              onClick={
                () => {
                  setParticipantsVote(new Map([...participantsVote.entries(), [participantSelected, option]]));
                  selectParticipant();
                }
              }
            />
          ))) :

          [...participantsVote.entries()].map(([participant, dialogOption]) => <div className={style['participant-vote']}>
            <ParticipantSwitch participant={participant} selectParticipant={selectParticipant} />
            <div className={style['option-button']}>
              {dialogOption ? dialogOption?.option : <FontAwesomeIcon icon={faCircleQuestion} />}
            </div>
          </div>)
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

const ParticipantSwitch = ({ participant, selectParticipant }: { participant: Participant, selectParticipant: () => void }) =>
(<button className={style['option-button']} onClick={() => { selectParticipant(participant) }} >
  <FontAwesomeIcon icon={faUser} /> {participant.name}
</button>)

export default Modal;
