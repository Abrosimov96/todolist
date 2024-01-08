import { Button, Checkbox, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
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

  const removeTodoList = () => {
    onRemoveList(id);
  };

  return (
    <div>
      <h3>
        <EditableSpan
          title={title}
          onChange={onChangeTodolistTitleHandler}
        />
        <IconButton onClick={removeTodoList}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addNewTask} />
      <div>
        {tasks.map((task) => {
          const onRemoveHanlder = () => removeTask(task.id, id);
          const onChangeStatusHanlder = (
            e: ChangeEvent<HTMLInputElement>,
          ) => changeTaskStatus(task.id, e.target.checked, id);
          const onChangeTitleHandler = (newTitle: string) => {
            changeTaskTitle(newTitle, task.id, id);
          };
          return (
            <div
              key={task.id}
              className={task.isDone ? 'is-done' : ''}>
              <Checkbox
                checked={task.isDone}
                onChange={onChangeStatusHanlder}
              />
              <EditableSpan
                title={task.title}
                onChange={onChangeTitleHandler}
              />
              <IconButton onClick={onRemoveHanlder}>
                <Delete />
              </IconButton>
            </div>
          );
        })}
      </div>
      <div>
        <Button
          variant={filter === 'all' ? 'contained' : 'text'}
          onClick={() => onClickFilter('all', id)}>
          All
        </Button>
        <Button
          color="primary"
          variant={filter === 'active' ? 'contained' : 'text'}
          onClick={() => onClickFilter('active', id)}>
          Active
        </Button>
        <Button
          color="secondary"
          variant={filter === 'complited' ? 'contained' : 'text'}
          onClick={() => onClickFilter('complited', id)}>
          Comleted
        </Button>
      </div>
    </div>
  );
}
