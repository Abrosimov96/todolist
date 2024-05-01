import {todolistsApi, TodolistTypeAPI} from '../api/todolists-api';
import {Dispatch} from 'redux';

export type FilterValuesType = 'all' | 'completed' | 'active';

export type TodolistType = TodolistTypeAPI & {
    filter: FilterValuesType;
};

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTitleTodolistActionType
    | ChangeFilterTodolistActionType
    | SetTodolistsActionType

const initialState: TodolistType[] = []

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionsType,): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter((fl) => fl.id !== action.id);
        }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistType = {
                ...action.todolist,
                filter: 'all'
            }
            return [
                newTodolist,
                ...state

            ];
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(todolist => todolist.id === action.id ? {...todolist, title: action.title} : todolist);
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(todolist => todolist.id === action.id ? {...todolist, filter: action.filter} : todolist);
        }
        case 'SET-TODOLISTS': {
            return action.todolists.map(t => {
                return {
                    ...t,
                    filter: 'all'
                }
            })
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
export const addTodolistAC = (todolist: TodolistTypeAPI) => {
    return {type: 'ADD-TODOLIST', todolist} as const;
};

export type ChangeTitleTodolistActionType = ReturnType<typeof changeTitleTodolistAC>
export const changeTitleTodolistAC = (id: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const;
};

export type ChangeFilterTodolistActionType = ReturnType<typeof changeFilterTodolistAC>
export const changeFilterTodolistAC = (id: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const;
};

export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export const setTodolistsAC = (todolists: TodolistTypeAPI[]) => {
    return {type: 'SET-TODOLISTS', todolists} as const;
};

export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistsApi.getTodolists()
            .then(res => {
                dispatch(setTodolistsAC(res.data))
            })
    }
}

export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsApi.deleteTodolist(todolistId)
            .then(res => {
                dispatch(removeTodolistAC(todolistId))
            })
    }
}

export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistsApi.createTodolist(title)
            .then(res => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsApi.updateTodolist(todolistId, title)
            .then(res => {
                dispatch(changeTitleTodolistAC(todolistId, title))
            })
    }
}

