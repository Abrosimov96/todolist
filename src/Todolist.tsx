import { ChangeEvent } from 'react';
import { AddItemForm } from './AddItemFor';
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
  const onClickFilter = (filter: FilterValuesType, id: string) => {
    changeFilter(filter, id);
  };

  const onRemoveList = (todolistId: string) => {
    removeList(todolistId);
  };

  const addNewTask = (title: string) => {
    addTask(title, id);
  };

  return (
    <div>
      <h3>
        {title}
        <button onClick={() => onRemoveList(id)}>x</button>
      </h3>
      <AddItemForm addItem={addNewTask} />
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
