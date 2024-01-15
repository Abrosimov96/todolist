import { v1 } from 'uuid';
import { FilterValuesType, TodolistType } from '../App';

type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST';
  id: string;
};

type AddTodolistActionType = {
  type: 'ADD-TODOLIST';
  title: string;
};

export type ChangeTitleTodolistActionType = {
  type: 'CHANGE-TODOLIST-TITLE';
  id: string;
  title: string;
};

export type ChangeFilterTodolistActionType = {
  type: 'CHANGE-TODOLIST-FILTER';
  id: string;
  filter: FilterValuesType;
};

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTitleTodolistActionType
  | ChangeFilterTodolistActionType;

export const todolistsReducer = (
  state: Array<TodolistType>,
  action: ActionsType,
): Array<TodolistType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter((fl) => fl.id !== action.id);
    }

    case 'ADD-TODOLIST': {
      return [
        ...state,
        {
          id: v1(),
          title: action.title,
          filter: 'all',
        },
      ];
    }

    case 'CHANGE-TODOLIST-TITLE': {
      const todo = state.find((td) => td.id === action.id);
      if (todo) {
        todo.title = action.title;
      }
      return [...state];
    }

    case 'CHANGE-TODOLIST-FILTER': {
      const todo = state.find((td) => td.id === action.id);
      if (todo) {
        todo.filter = action.filter;
      }
      return [...state];
    }

    default:
      throw new Error('I dont know what to do.');
  }
};

export const RemoveTodolistAC = (
  todolistId: string,
): RemoveTodolistActionType => {
  return { type: 'REMOVE-TODOLIST', id: todolistId };
};

export const AddTodolistAC = (
  title: string,
): AddTodolistActionType => {
  return { type: 'ADD-TODOLIST', title: title };
};

export const ChangeTitleTodolistAC = (
  id: string,
  title: string,
): ChangeTitleTodolistActionType => {
  return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title };
};

export const ChangeFilterTodolistAC = (
  id: string,
  filter: FilterValuesType,
): ChangeFilterTodolistActionType => {
  return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter };
};
