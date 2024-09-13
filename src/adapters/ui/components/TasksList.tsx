
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addTask, removeTask, reorderTask, fetchTasks } from "../../state/tasksSlice";

import Button from './Button';
import Icon from './Icon';
import { Task } from '../../../core/domain/Participant';
import Input from './Input';
import style from './Common.module.css';



const TaskInput = ({ task, dragged }: { task: Task, dragged: boolean }) => {
	const [inputValue, setInputValue] = useState(task.description);
	const dispatch = useDispatch();

	const classNames = [style.field, "field_task_input",
	dragged && style.dragged
	].filter(item => !!item).join(" ");
	return (
		<div className={classNames}>
			<Icon className={style['drag-icon']} icon={dragged ? "move" : "align-justify"} title="Drag around to reorder it" />
			<Input label="Task" value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="New task" />
			<Button className={style.button} onClick={() => dispatch(addTask({ rewardId: task.rewardId, task: { ...task, description: inputValue } }))}>
				<Icon icon="check" />
			</Button>
			<Button className={style.button} onClick={() => dispatch(removeTask({ rewardId: task.rewardId, taskId: task.id }))}>
				<Icon icon="trash-2" />
			</Button>

		</div>
	);
};


const TasksList = ({ rewardId }: { rewardId: string }) => {
	const { tasks } = useSelector((state) => state.tasks);
	const dispatch = useDispatch();
	const [draggingItem, setDraggingItem] = useState(null);
	useEffect(() => {
		dispatch(fetchTasks(rewardId));
	}, []);
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
		dispatch(reorderTask({ rewardId: draggingItem.rewardId, taskId: draggingItem.id, order: targetItem.order }));
	};

	return <section className={style.section}>
		<header className={style['section-header']}>
			<h3>Tasks for {rewardId}</h3>
			<Button onClick={() => dispatch(addTask({ rewardId: rewardId, task: { description: '' } }))}>
				<Icon icon="plus-circle" />
			</Button>
		</header>
		{tasks
			.byRewardId[rewardId]?.map(taskId => {
				const task = tasks.byId[taskId];
				return (
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
				)
			})}
	</section>
}

export default TasksList;
