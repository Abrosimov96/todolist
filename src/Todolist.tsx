import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from './App';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: TaskType[];
  addTask: (title: string, todolistId: string) => void;
  removeTask: (id: string, todolistId: string) => void;
  changeFilter: (
    filter: FilterValuesType,
    todolistId: string,
  ) => void;
  changeTaskStatus: (
    id: string,
    isDone: boolean,
    todolistId: string,
  ) => void;
  removeList: (todolistId: string) => void;
  filter: FilterValuesType;
};

export function Todolist({
  id,
  removeList,
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
    addTask(newTaskTitle, id);
    setNewTaskTitle('');
  };

  const onNewTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.target.value);
  };

  const onKeyPressHadler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError('');
    e.code === 'Enter' && addNewTask();
  };

  const onClickFilter = (filter: FilterValuesType, id: string) => {
    changeFilter(filter, id);
  };

  const onRemoveList = (todolistId: string) => {
    removeList(todolistId);
  };

  return (
    <div>
      <h3>
        {title}
        <button onClick={() => onRemoveList(id)}>x</button>
      </h3>
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
          const onRemoveHanlder = () => removeTask(task.id, id);
          const onChangeHanlder = (
            e: ChangeEvent<HTMLInputElement>,
          ) => changeTaskStatus(task.id, e.target.checked, id);
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
          onClick={() => onClickFilter('all', id)}>
          All
        </button>
        <button
          className={filter === 'active' ? 'active-filter' : ''}
          onClick={() => onClickFilter('active', id)}>
          Active
        </button>
        <button
          className={filter === 'complited' ? 'active-filter' : ''}
          onClick={() => onClickFilter('complited', id)}>
          Comleted
        </button>
      </div>
    </div>
  );
}
