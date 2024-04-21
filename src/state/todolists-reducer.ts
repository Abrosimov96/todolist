import {v1} from 'uuid';
import {FilterValuesType, TodolistType} from '../App';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST';
    id: string;
};

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST';
    title: string;
    todolistId: string;
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

const initialState: TodolistType[] = [
]

export const todolistsReducer = (
    state: Array<TodolistType> = initialState,
    action: ActionsType,
): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter((fl) => fl.id !== action.id);
        }
        case 'ADD-TODOLIST': {
            return [
                {
                    id: action.todolistId,
                    title: action.title,
                    filter: 'all',
                },
                ...state

            ];
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(todolist => todolist.id === action.id ? {...todolist, title: action.title} : todolist);
        }

        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(todolist => todolist.id === action.id ? {...todolist, filter: action.filter} : todolist);
        }

        default:
            return state;
    }
};

export const removeTodolistAC = (
    todolistId: string,
): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId};
};

export const addTodolistAC = (
    title: string,
): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()};
};

export const changeTitleTodolistAC = (
    id: string,
    title: string,
): ChangeTitleTodolistActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title};
};

export const changeFilterTodolistAC = (
    id: string,
    filter: FilterValuesType,
): ChangeFilterTodolistActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter};
};
