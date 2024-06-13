// import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faCommentPlus, faCheck, faTrashXmark, faBars, faBarsStaggered } from '@fortawesome/pro-duotone-svg-icons';


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

  const handleDragEnter = (e) => {
    e.target.closest('.field_task_input').classList.add('dragged-over');
  }
  const handleDragLeave = (e) => {
    e.target.closest('.field_task_input').classList.remove('dragged-over');
  }

  const handleDrop = (e, targetItem) => {
    if (!draggingItem) return;
    e.target.classList.remove('dragged-over');
    reorderTask(draggingItem.id, targetItem.order);
  };


  return (
    <div className={style.config}>
      <h2>Config</h2>

      <section className={style.section}>
        <header className={style['section-header']}>
          <h3>Reward</h3>
        </header>
        <div className={style.field}>
          <TextArea label="Set the reward description" value={rewardInput} onChange={e => setRewardInput(e.target.value)} />
          <Button onClick={() => setReward(rewardInput)}>
            <FontAwesomeIcon icon={faCheck} />
          </Button>
        </div>
      </section>

      <section className={style.section}>
        <header className={style['section-header']}>
          <h3>Participants</h3>
          <Button onClick={() => addParticipant({ name: '' })}>
            <FontAwesomeIcon icon={faUserPlus} />
          </Button>
        </header>
        {config.participants.map(participant => (
          <ParticipantInput key={participant.id || 'empty-key'} participant={participant} />
        ))}
      </section>

      <section className={style.section}>
        <header className={style['section-header']}>
          <h3>Daily tasks</h3>
          <Button onClick={() => addTask({ description: '' })}>
            <FontAwesomeIcon icon={faCommentPlus} />
          </Button>
        </header>
        {config.dailyTasks.map(task => (
          <div
            key={`container_${task.id || 'empty-key'}`}
            draggable={true}
            onDragStart={(e) => handleDragStart(e, task)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, task)}
          >
            <TaskInput key={task.id || 'empty-key'} dragged={draggingItem && draggingItem.id === task.id} task={task} />
          </div>
        ))}
      </section>
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

const TaskInput = ({ task, dragged }: { task: Task, dragged: boolean }) => {
  const [inputValue, setInputValue] = useState(task.description);
  const { addTask, removeTask } = useConfigContext();
  const classNames = [style.field, "field_task_input",
  dragged && style.dragged
  ].filter(item => !!item).join(" ");
  return (
    <div className={classNames}>
      <FontAwesomeIcon className={style['drag-icon']} icon={dragged ? faBarsStaggered : faBars} title="Drag around to reorder it" />
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
