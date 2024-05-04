import {todolistsApi, TodolistTypeAPI} from '../api/todolists-api';
import {RequestStatusType, setAppStatusAC} from './app-reducer';
import {RootDispatchActionType} from './store';
import {handleServerNetworkError} from '../utils/error-utils';

const initialState: TodolistType[] = []

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: TodolistActionsType,): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter((fl) => fl.id !== action.id);
        case 'ADD-TODOLIST':
            return [
                {...action.todolist, filter: 'all', entityStatus: 'idle'},
                ...state
            ];
        case 'CHANGE-TODOLIST-STATUS':
            return state.map(todolist => todolist.id === action.id ? {...todolist, entityStatus: action.entityStatus} : todolist);
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(todolist => todolist.id === action.id ? {...todolist, title: action.title} : todolist);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(todolist => todolist.id === action.id ? {...todolist, filter: action.filter} : todolist);
        case 'SET-TODOLISTS':
            return action.todolists.map(t => ({...t, filter: 'all', entityStatus: 'idle'}))
        default:
            return state;
    }
};


// --------- ACTION CREATORS ---------
export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', id: todolistId} as const;
};
export const addTodolistAC = (todolist: TodolistTypeAPI) => {
    return {type: 'ADD-TODOLIST', todolist} as const;
};
export const setTodolistsAC = (todolists: TodolistTypeAPI[]) => {
    return {type: 'SET-TODOLISTS', todolists} as const;
};
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title} as const;
};
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter} as const;
};
export const changeTodolistStatusAC = (id: string, entityStatus: RequestStatusType) => {
    return {type: 'CHANGE-TODOLIST-STATUS', id, entityStatus} as const;
};


// --------- THUNK CREATORS ---------
export const fetchTodolistsTC = () => (dispatch: RootDispatchActionType) => {
    dispatch(setAppStatusAC('loading'))
    todolistsApi.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: RootDispatchActionType) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistStatusAC(todolistId, 'loading'))
    todolistsApi.deleteTodolist(todolistId)
        .then(res => {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const addTodolistTC = (title: string) => (dispatch: RootDispatchActionType) => {
    dispatch(setAppStatusAC('loading'))
    todolistsApi.createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: RootDispatchActionType) => {
    dispatch(setAppStatusAC('loading'))
    todolistsApi.updateTodolist(todolistId, title)
        .then(res => {
            dispatch(changeTodolistTitleAC(todolistId, title))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}


// --------- TYPES ---------
export type FilterValuesType = 'all' | 'completed' | 'active';

export type TodolistType = TodolistTypeAPI & {
    filter: FilterValuesType;
    entityStatus: RequestStatusType
};

export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>

export type TodolistActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsActionType
    | ReturnType<typeof changeTodolistStatusAC>