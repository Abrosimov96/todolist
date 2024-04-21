import {v1} from 'uuid';
import {TodolistTypeAPI} from '../api/todolists-api';

export type FilterValuesType = 'all' | 'completed' | 'active';

export type TodolistType = TodolistTypeAPI &  {
    filter: FilterValuesType;
};

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTitleTodolistActionType
    | ChangeFilterTodolistActionType;

const initialState: TodolistType[] = []

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionsType,): Array<TodolistType> => {
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
                    addedDate: '',
                    order: 0
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

// --------- ACTION CREATORS ---------

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', id: todolistId} as const;
};

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()} as const;
};

export type ChangeTitleTodolistActionType = ReturnType<typeof changeTitleTodolistAC>
export const changeTitleTodolistAC = (id: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const;
};

export type ChangeFilterTodolistActionType = ReturnType<typeof changeFilterTodolistAC>
export const changeFilterTodolistAC = (id: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const;
};
