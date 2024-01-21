import { v1 } from 'uuid';
import { TasksStateType } from '../App';
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
} from './todolists-reducer';

type RemoveTaskActionType = {
  type: 'REMOVE-TASK';
  todolistId: string;
  taskId: string;
};

type AddTaskActionType = {
  type: 'ADD-TASK';
  title: string;
  todolistId: string;
};

type ChangeStatusTaskActionType = {
  type: 'CHANGE-STATUS-TASK';
  taskId: string;
  isDone: boolean;
  todolistId: string;
};

type ChangeTitleTaskActionType = {
  type: 'CHANGE-TITLE-TASK';
  taskId: string;
  title: string;
  todolistId: string;
};

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeStatusTaskActionType
  | ChangeTitleTaskActionType
  | AddTodolistActionType
  | RemoveTodolistActionType;

export const tasksReducer = (
  state: TasksStateType,
  action: ActionsType,
): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      const stateCopy = { ...state };
      const tasks = state[action.todolistId];
      const filteredTasks = tasks.filter(
        (t) => t.id !== action.taskId,
      );
      stateCopy[action.todolistId] = filteredTasks;
      return stateCopy;
    }
    case 'ADD-TASK': {
      const stateCopy = { ...state };
      const newTask = {
        id: v1(),
        title: action.title,
        isDone: false,
      };
      const tasks = state[action.todolistId];
      const newTasks = [newTask, ...tasks];
      stateCopy[action.todolistId] = newTasks;
      return stateCopy;
    }
    case 'CHANGE-STATUS-TASK': {
      const stateCopy = { ...state };
      const tasks = state[action.todolistId];
      const task = tasks.find((t) => t.id === action.taskId);
      if (task) {
        task.isDone = action.isDone;
      }
      return stateCopy;
    }
    case 'CHANGE-TITLE-TASK': {
      const stateCopy = { ...state };
      const tasks = state[action.todolistId];
      const task = tasks.find((t) => t.id === action.taskId);
      if (task) {
        task.title = action.title;
      }
      return stateCopy;
    }
    case 'ADD-TODOLIST': {
      let stateCopy = { ...state };
      stateCopy[action.todolistId] = [];
      return stateCopy;
    }
    case 'REMOVE-TODOLIST': {
      const stateCopy = { ...state };
      delete stateCopy[action.id];
      return stateCopy;
    }
    default:
      throw new Error('I dont know what to do.');
  }
};

export const removeTaskAC = (
  taskId: string,
  todolistId: string,
): RemoveTaskActionType => {
  return { type: 'REMOVE-TASK', todolistId, taskId };
};

export const addTaskAC = (
  title: string,
  todolistId: string,
): AddTaskActionType => {
  return { type: 'ADD-TASK', title, todolistId };
};

export const changeTaskStatusAC = (
  taskId: string,
  isDone: boolean,
  todolistId: string,
): ChangeStatusTaskActionType => {
  return { type: 'CHANGE-STATUS-TASK', taskId, isDone, todolistId };
};

export const changeTaskTitleAC = (
  taskId: string,
  title: string,
  todolistId: string,
): ChangeTitleTaskActionType => {
  return { type: 'CHANGE-TITLE-TASK', taskId, title, todolistId };
};
