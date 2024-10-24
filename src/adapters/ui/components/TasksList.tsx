
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addTask, removeTask, reorderTask, fetchTasks } from "../../state/tasksSlice";
import { RootState, AppDispatch } from '../../state/store';
import Button from './Button';
import { Move, AlignJustify, Trash2, PlusSquare } from 'react-feather';
import { Task, TaskId } from '../../../core/domain/Task';
import Input from './Input';
import style from './Common.module.css';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDebounce } from '../hooks/useDebounce';



const TaskInput = ({ taskDescription, onInputChange, dragged, onDeleteTask }: { taskDescription: string, onInputChange: (inputValue: string) => void, dragged: boolean, onDeleteTask: () => void }) => {
	const intl = useIntl();
	const [inputValue, setInputValue] = useState<string>(taskDescription);
	//const dispatch = useDispatch<AppDispatch>();

	const debouncedInputValue = useDebounce<string>(inputValue, 500);
	useEffect(() => {
		if (taskDescription !== inputValue) {
			setInputValue(taskDescription);  // Only sync if taskDescription is different
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [taskDescription]);
	useEffect(() => {
		if (debouncedInputValue !== taskDescription) {
			console.log("DEBOUNCED ADD TASK");
			onInputChange(debouncedInputValue);  // Only trigger update if debounced value is new
		}
	}, [debouncedInputValue, taskDescription, onInputChange]);

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
				label={intl.formatMessage({ defaultMessage: "Task" })}
				fieldStyle={{ flexGrow: "1" }}
				style={{ width: "80%" }}
				value={inputValue}
				onChange={e => {

					setInputValue(e.target.value);
				}}
				placeholder={intl.formatMessage({ defaultMessage: "New task" })}
			/>
			<Button className={style.button} onClick={onDeleteTask}>
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

	const handleInputChange = (task: Task, inputValue: string) => {
		dispatch(addTask({ rewardId: task.rewardId, task: { ...task, description: inputValue } }));
	};
	const handleDelete = (task: Task) => {
		dispatch(removeTask({ rewardId: task.rewardId, taskId: task.id }));
	};
	return <section className={style.section} ref={lastRewardRef}>
		<header className={style['section-header']}>
			<h3><FormattedMessage defaultMessage={'Tasks'} /></h3>
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
						<TaskInput
							key={task.id || 'empty-key'}
							dragged={Boolean(draggingItem) && draggingItem?.id === task.id}
							taskDescription={task.description}
							onInputChange={(inputValue) => handleInputChange(task, inputValue)}
							onDeleteTask={() => handleDelete(task)}
						/>
					</div>
				);
			})}
	</section>;
};

export default TasksList;
