import { useEffect, useRef, ReactNode, useState } from 'react';
import { faCircleXmark, faUser } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Participant } from '../../../core/domain/Participant';

import style from './Dialog.module.css';
// Define the props type

interface DialogOption {
  option: ReactNode;
  action: () => void;
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
  console.log({ participants })
  const [participantSelected, selectParticipant] = useState<Participant | undefined>();
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
        {console.log(participantSelected)}
        {participantSelected ?
          (options.map((option, idx) => (
            <Option key={"key_" + idx} {...option} />
          )))
          :
          (participants.map(participant => (<ParticipantSwitch key={participant.id} participant={participant} selectParticipant={selectParticipant} />)))
        }


      </div>
      <div className={style.content}>{children}</div>
    </dialog>
  );
};

const Option = ({ option, action }: DialogOption) => (
  <button className={style['option-button']} onClick={action}>
    {option}
  </button>
);

const ParticipantSwitch = ({ participant, selectParticipant }: { participant: Participant, selectParticipant: () => void }) =>
(<button style={{ width: "100%" }} className={style['option-button']} onClick={() => { selectParticipant(participant) }} >
  <FontAwesomeIcon icon={faUser} /> {participant.name}
</button>)

export default Modal;
