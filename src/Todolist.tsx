import { ChangeEvent } from 'react';
import { AddItemForm } from './AddItemFor';
import { FilterValuesType } from './App';
import { EditableSpan } from './EditableSpan';

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
  changeTaskTitle: (
    newTitle: string,
    taskId: string,
    todolistId: string,
  ) => void;
  changeTodolistTitle: (newTitle: string, todolistId: string) => void;
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
  changeTaskTitle,
  changeTodolistTitle,
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

  const onChangeTodolistTitleHandler = (newTitle: string) => {
    changeTodolistTitle(newTitle, id);
  };

  return (
    <div>
      <h3>
        <EditableSpan
          title={title}
          onChange={onChangeTodolistTitleHandler}
        />
        <button onClick={() => onRemoveList(id)}>x</button>
      </h3>
      <AddItemForm addItem={addNewTask} />
      <ul>
        {tasks.map((task) => {
          const onRemoveHanlder = () => removeTask(task.id, id);
          const onChangeStatusHanlder = (
            e: ChangeEvent<HTMLInputElement>,
          ) => changeTaskStatus(task.id, e.target.checked, id);
          const onChangeTitleHandler = (newTitle: string) => {
            changeTaskTitle(newTitle, task.id, id);
          };
          return (
            <li
              key={task.id}
              className={task.isDone ? 'is-done' : ''}>
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={onChangeStatusHanlder}
              />
              <EditableSpan
                title={task.title}
                onChange={onChangeTitleHandler}
              />
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
