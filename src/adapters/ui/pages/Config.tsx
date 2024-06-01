// import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faCheck, faTrashXmark } from '@fortawesome/pro-duotone-svg-icons';

import TextArea from '../components/TextArea';
import Button from '../components/Button';
import { useConfigContext } from '../context/ConfigContext';
import { useState } from 'react';
import { Participant } from '../../../core/domain/Participant';
import Input from '../components/Input';
import style from './Config.module.css';

export const Config = () => {
  const { config, setReward, addParticipant } = useConfigContext();

  const [rewardInput, setRewardInput] = useState(config.reward);

  return (
    <div>
      <h2>Config</h2>
      <div className={style.field}>
        <TextArea label="Reward" value={rewardInput} onChange={e => setRewardInput(e.target.value)} />
        <Button onClick={() => setReward(rewardInput)}>
          <FontAwesomeIcon icon={faCheck} />
        </Button>
      </div>
      <Button onClick={() => addParticipant({ name: '' })}>
        <FontAwesomeIcon icon={faUserPlus} />
      </Button>
      {config.participants.map(participant => (
        <ParticipantInput key={participant.id || 'empty-key'} participant={participant} />
      ))}
    </div>
  );
};

const ParticipantInput = ({ participant }: { participant: Participant }) => {
  const [inputValue, setInputValue] = useState(participant.name);
  const { addParticipant, removeParticipant } = useConfigContext();

  return (
    <div className={style.field}>
      <Input label="Participant" value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="New participant" />
      <Button onClick={() => addParticipant({ ...participant, name: inputValue })}>
        <FontAwesomeIcon icon={faCheck} />
      </Button>
      <Button onClick={() => removeParticipant(participant.id || '')}>
        <FontAwesomeIcon icon={faTrashXmark} />
      </Button>
    </div>
  );
};
