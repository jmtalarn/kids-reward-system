
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addTask, removeTask, reorderTask, fetchTasks } from "../../state/tasksSlice";
import { RootState, AppDispatch } from '../../state/store';
import Button from './Button';
import { Move, AlignJustify, Check, Trash2, PlusSquare } from 'react-feather';
import { Task, TaskId } from '../../../core/domain/Task';
import Input from './Input';
import style from './Common.module.css';



const TaskInput = ({ task, dragged }: { task: Task, dragged: boolean }) => {
	const [inputValue, setInputValue] = useState(task.description);
	const dispatch = useDispatch<AppDispatch>();
	const classNames = [style.field, "field_task_input",
	dragged && style.dragged
	].filter(item => !!item).join(" ");

	return (
		<div className={classNames}>

			{dragged ?
				<Move className={style['drag-icon']} />
				:
				<AlignJustify className={style['drag-icon']} />
			}
			<Input
				label="Task"
				fieldStyle={{ flexGrow: "1" }}
				style={{ width: "80%" }}
				value={inputValue}
				onChange={e => setInputValue(e.target.value)} placeholder="New task"
			/>
			<Button className={style.button} onClick={() => dispatch(addTask({ rewardId: task.rewardId, task: { ...task, description: inputValue } }))}>
				<Check />
			</Button>
			<Button className={style.button} onClick={() => dispatch(removeTask({ rewardId: task.rewardId, taskId: task.id }))}>
				<Trash2 style={{ minWidth: "1rem" }} />
			</Button>

		</div>
	);
};


const TasksList = ({ rewardId }: { rewardId: string }) => {
	const { tasks } = useSelector((state: RootState) => state.tasks);
	const dispatch = useDispatch<AppDispatch>();
	const [draggingItem, setDraggingItem] = useState<Task | null>(null);

	useEffect(() => {
		dispatch(fetchTasks({}));
	}, []);
	const lastRewardRef = useRef<null | HTMLElement>(null);

	const handleDragStart = (e: React.DragEvent<HTMLElement>, item: Task) => {

		setDraggingItem(item);
		e.dataTransfer.setData('text/plain', '');
	};

	const handleDragEnd = () => {
		setDraggingItem(null);
	};

	const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
		e.preventDefault();
	};

	const handleDragEnter = (e: React.DragEvent<HTMLElement>) => {
		(e.target as HTMLElement).closest('.field_task_input')?.classList.add('dragged-over');
	};
	const handleDragLeave = (e: React.DragEvent<HTMLElement>) => {
		(e.target as HTMLElement).closest('.field_task_input')?.classList.remove('dragged-over');
	};

	const handleDrop = (e: React.DragEvent<HTMLElement>, targetItem: Task) => {
		if (!draggingItem) return;
		(e.target as HTMLElement).classList.remove('dragged-over');
		dispatch(reorderTask({ rewardId: draggingItem.rewardId, taskId: draggingItem.id, order: targetItem.order || 0 }));
	};

	return <section className={style.section} ref={lastRewardRef}>
		<header className={style['section-header']}>
			<h3>Tasks</h3>
			<Button
				onClick={
					() => {
						dispatch(
							addTask(
								{
									rewardId: rewardId,
									task: {
										description: ''
									}
								}));
						setTimeout(() => {
							lastRewardRef.current?.scrollIntoView({ block: 'end', behavior: "smooth" });
						}, 0);

					}
				}
			>
				<PlusSquare />
			</Button>
		</header>
		{tasks
			.byRewardId[rewardId]?.map((taskId: TaskId) => {
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
						<TaskInput key={task.id || 'empty-key'} dragged={Boolean(draggingItem) && draggingItem?.id === task.id} task={task} />
					</div>
				);
			})}
	</section>;
};

export default TasksList;
