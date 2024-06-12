// import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faCommentPlus, faCheck, faTrashXmark } from '@fortawesome/pro-duotone-svg-icons';

import TextArea from '../components/TextArea';
import Button from '../components/Button';
import { useConfigContext } from '../context/ConfigContext';
import { useState } from 'react';
import { Participant } from '../../../core/domain/Participant';
import Input from '../components/Input';
import style from './Config.module.css';

export const Config = () => {
  const { config, setReward, addParticipant, addTask, reorderTask } = useConfigContext();

  const [rewardInput, setRewardInput] = useState(config.reward);

  const [draggingItem, setDraggingItem] = useState(null);

  const handleDragStart = (e, item) => {
    setDraggingItem(item);
    e.dataTransfer.setData('text/plain', '');
  };

  const handleDragEnd = () => {
    setDraggingItem(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetItem) => {
    //const { draggingItem, items } = this.state;
    if (!draggingItem) return;
    console.log({ e, draggingItem, targetItem })
    if (targetItem.order < draggingItem.order) {
      reorderTask(draggingItem.id, targetItem.order + 1);
    } else {
      reorderTask(targetItem.id, targetItem.order + 1);
    }

    // reorderTask(targetItem.id, targetItem.order - 1);
    // const currentIndex = items.indexOf(draggingItem);
    // const targetIndex = items.indexOf(targetItem);

    // if (currentIndex !== -1 && targetIndex !== -1) {
    //   items.splice(currentIndex, 1);
    //   items.splice(targetIndex, 0, draggingItem);
    //   this.setState({ items });
    // }
  };

  console.log({ config })
  return (
    <div>
      <h2>Config</h2>

      <h3>Reward</h3>
      <div className={style.field}>
        <TextArea label="Set the reward description" value={rewardInput} onChange={e => setRewardInput(e.target.value)} />
        <Button onClick={() => setReward(rewardInput)}>
          <FontAwesomeIcon icon={faCheck} />
        </Button>
      </div>

      <h3>Participants</h3>
      <Button onClick={() => addParticipant({ name: '' })}>
        <FontAwesomeIcon icon={faUserPlus} />
      </Button>
      {config.participants.map(participant => (
        <ParticipantInput key={participant.id || 'empty-key'} participant={participant} />
      ))}

      <h3>Daily tasks</h3>
      <Button onClick={() => addTask({ description: '' })}>
        <FontAwesomeIcon icon={faCommentPlus} />
      </Button>
      {config.dailyTasks.map(task => (
        <div
          key={`container_${task.id || 'empty-key'}`}
          draggable={true}
          onDragStart={(e) => handleDragStart(e, task)}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, task)}
        >
          <TaskInput key={task.id || 'empty-key'} task={task} />
        </div>
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
      <Button className={style.button} onClick={() => addParticipant({ ...participant, name: inputValue })}>
        <FontAwesomeIcon icon={faCheck} />
      </Button>
      <Button className={style.button} onClick={() => removeParticipant(participant.id || '')}>
        <FontAwesomeIcon icon={faTrashXmark} />
      </Button>
    </div>
  );
};

const TaskInput = ({ task }: { task: Task }) => {
  const [inputValue, setInputValue] = useState(task.description);
  const { addTask, removeTask } = useConfigContext();

  return (
    <div className={style.field}>
      <Input label="Task" value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="New task" />
      <Button className={style.button} onClick={() => addTask({ ...task, description: inputValue })}>
        <FontAwesomeIcon icon={faCheck} />
      </Button>
      <Button className={style.button} onClick={() => removeTask(task.id || '')}>
        <FontAwesomeIcon icon={faTrashXmark} />
      </Button>
    </div>
  );
};
