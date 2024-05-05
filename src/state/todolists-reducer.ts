import {todolistsApi, TodolistTypeAPI} from '../api/todolists-api';
import {RequestStatusType, setAppStatusAC} from './app-reducer';
import {AppThunkType} from './store';
import {handleServerNetworkError} from '../utils/error-utils';

const initialState: TodolistType[] = []

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: TodolistActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter((fl) => fl.id !== action.id);
        case 'ADD-TODOLIST':
            return [
                {...action.todolist, filter: 'all', entityStatus: 'idle'},
                ...state
            ];
        case 'UPDATE-TODOLIST':
            return state.map(todolist => todolist.id === action.id ? {...todolist, ...action.todolist} : todolist);
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
export const updateTodolistAC = (id: string, todolist: Partial<TodolistType>) => {
    return {type: 'UPDATE-TODOLIST', id, todolist} as const;
};


// --------- THUNK CREATORS ---------
export const fetchTodolistsTC = (): AppThunkType => (dispatch) => {
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
// export const _fetchTodolistsTC = (): AppThunkType => async dispatch => {
//     dispatch(setAppStatusAC('loading'))
//     try {
//         const response = await todolistsApi.getTodolists()
//         dispatch(setTodolistsAC(response.data))
//         dispatch(setAppStatusAC('succeeded'))
//     } catch (error) {
//         handleServerNetworkError(error, dispatch)
//     }
// }
export const removeTodolistTC = (todolistId: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(updateTodolistAC(todolistId, {entityStatus: 'loading'}))
    todolistsApi.deleteTodolist(todolistId)
        .then(res => {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const addTodolistTC = (title: string): AppThunkType => (dispatch) => {
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
export const changeTodolistTitleTC = (todolistId: string, title: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsApi.updateTodolist(todolistId, title)
        .then(res => {
            dispatch(updateTodolistAC(todolistId, {title}))
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
    | SetTodolistsActionType
    | ReturnType<typeof updateTodolistAC>