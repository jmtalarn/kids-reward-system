import { useEffect, useRef, useState } from 'react';
import { Settings as SettingsIcon, XCircle } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import LanguageSelector from './LanguageSelector';
import style from './Settings.module.css';
import Button from './Button';

interface ModalProps {
  openModal: boolean;
  closeModal: () => void;
}


export const Settings = () => {

  const [modalOpen, setModalOpen] = useState<boolean>(false);


  return <>
    <Button className={style['settings-button']}
      onClick={() => setTimeout(() => setModalOpen(true), 150)}><SettingsIcon />
    </Button>
    {modalOpen && (<Modal
      openModal={modalOpen}
      closeModal={() => { setModalOpen(false); }}
    />)
    }
  </>;

};
// Modal as a separate component
const Modal: React.FC<ModalProps> = ({ openModal, closeModal }) => {

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
        <h3><FormattedMessage defaultMessage={'Settings'} /></h3>
        <button className={style['close-button']} onClick={closeModal}>
          <XCircle />
        </button>
      </header>
      <div className={style.content}>
        <div className={style.field}>
          <LanguageSelector />
        </div>
      </div>
    </dialog >
  );
};



