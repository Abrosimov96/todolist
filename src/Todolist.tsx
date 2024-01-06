import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from './App';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: TaskType[];
  addTask: (title: string) => void;
  removeTask: (id: string) => void;
  changeFilter: (filter: FilterValuesType) => void;
};

export function Todolist({
  title,
  tasks,
  addTask,
  removeTask,
  changeFilter,
}: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const addNewTask = () => {
    newTaskTitle && addTask(newTaskTitle);
    setNewTaskTitle('');
  };

  const onNewTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.target.value);
  };

  const onKeyPressHadler = (e: KeyboardEvent<HTMLInputElement>) => {
    e.code === 'Enter' && addNewTask();
  };

  const onClickFilter = (filter: FilterValuesType) => {
    changeFilter(filter);
  };

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          type="text"
          value={newTaskTitle}
          onChange={onNewTitleHandler}
          onKeyUp={onKeyPressHadler}
        />
        <button onClick={addNewTask}>+</button>
      </div>
      <ul>
        {tasks.map((task) => {
          const onRemoveHanlder = () => removeTask(task.id);
          return (
            <li key={task.id}>
              <input type="checkbox" checked={task.isDone} />
              <span>{task.title}</span>
              <button onClick={onRemoveHanlder}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={() => onClickFilter('all')}>All</button>
        <button onClick={() => onClickFilter('active')}>
          Active
        </button>
        <button onClick={() => onClickFilter('complited')}>
          Comleted
        </button>
      </div>
    </div>
  );
}
