import { useEffect, useRef, ReactNode } from 'react';
import { faCircleXmark } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Button from './Button';
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
}

// Modal as a separate component
const Modal: React.FC<ModalProps> = ({ openModal, closeModal, children, options }) => {
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
        {options.map(option => (
          <Option {...option} />
        ))}
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
export default Modal;
