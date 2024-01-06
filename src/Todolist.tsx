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
  changeTaskStatus: (id: string, isDone: boolean) => void;
  filter: FilterValuesType;
};

export function Todolist({
  title,
  tasks,
  addTask,
  removeTask,
  changeFilter,
  changeTaskStatus,
  filter,
}: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState('');

  const addNewTask = () => {
    if (newTaskTitle.trim() === '') {
      setNewTaskTitle('');
      setError('Field is required!');
      return;
    }
    addTask(newTaskTitle);
    setNewTaskTitle('');
  };

  const onNewTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.target.value);
  };

  const onKeyPressHadler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError('');
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
          onKeyDown={onKeyPressHadler}
          className={error ? 'error' : ''}
        />
        <button onClick={addNewTask}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {tasks.map((task) => {
          const onRemoveHanlder = () => removeTask(task.id);
          const onChangeHanlder = (
            e: ChangeEvent<HTMLInputElement>,
          ) => changeTaskStatus(task.id, e.target.checked);
          return (
            <li
              key={task.id}
              className={task.isDone ? 'is-done' : ''}>
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={onChangeHanlder}
              />
              <span>{task.title}</span>
              <button onClick={onRemoveHanlder}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          className={filter === 'all' ? 'active-filter' : ''}
          onClick={() => onClickFilter('all')}>
          All
        </button>
        <button
          className={filter === 'active' ? 'active-filter' : ''}
          onClick={() => onClickFilter('active')}>
          Active
        </button>
        <button
          className={filter === 'complited' ? 'active-filter' : ''}
          onClick={() => onClickFilter('complited')}>
          Comleted
        </button>
      </div>
    </div>
  );
}
