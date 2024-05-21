import {todolistsApi, TodolistTypeAPI} from '../api/todolists-api';
import {RequestStatusType, setAppStatusAC} from './app-reducer';
import {AppThunkType, StoreType} from './store';
import {handleServerNetworkError} from '../utils/error-utils';
import {fetchTasksTC} from './tasks-reducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: TodolistType[] = []

const todolistSlice = createSlice({
    name: 'todolist',
    initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
            const index = state.findIndex(todolist => todolist.id === action.payload.todolistId)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistTypeAPI }>) {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        setTodolistsAC(state, action: PayloadAction<{ todolists: TodolistTypeAPI[] }>) {
             return action.payload.todolists.map(todolist => ({...todolist, filter: 'all', entityStatus: 'idle'}))
        },
        updateTodolistAC(state, action: PayloadAction<{ todolist: TodolistType, todolistId: string }>) {
            const index = state.findIndex(todolist => todolist.id === action.payload.todolistId)
            if (index > -1) state[index] = {...state[index], ...action.payload.todolist}
        },
        clearTasksAndTodolistsAC(state) {
            state = []
        },
    }
})

export const todolistsReducer = todolistSlice.reducer


// --------- ACTION CREATORS ---------
export const {
    removeTodolistAC,
    addTodolistAC,
    setTodolistsAC,
    updateTodolistAC,
    clearTasksAndTodolistsAC
} = todolistSlice.actions

// --------- THUNK CREATORS ---------
export const fetchTodolistsTC = (): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsApi.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC({todolists: res.data}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return res.data
        })
        .then((todolists) => {
            todolists.forEach(todolist => dispatch(fetchTasksTC(todolist.id)))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const removeTodolistTC = (todolistId: string): AppThunkType => (dispatch, getState) => {
    if (getState().todolists) {
        const currentTodolist = getState().todolists.find(tl => tl.id === todolistId)
        if (currentTodolist !== undefined) {
            dispatch(setAppStatusAC({status: 'loading'}))
            dispatch(updateTodolistAC({todolist: currentTodolist, todolistId}))
            todolistsApi.deleteTodolist(todolistId)
                .then(res => {
                    dispatch(removeTodolistAC({todolistId}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                })
                .catch((error) => {
                    handleServerNetworkError(error, dispatch)
                })
        }
    }
}
export const addTodolistTC = (title: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsApi.createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC({todolist: res.data.data.item}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const changeTodolistTitleTC = (todolistId: string, title: string): AppThunkType => (dispatch, getState) => {
    if (getState().todolists) {
        const currentTodolist = getState().todolists.find(tl => tl.id === todolistId)
        if (currentTodolist !== undefined) {
            dispatch(setAppStatusAC({status: 'loading'}))
            todolistsApi.updateTodolist(todolistId, title)
                .then(res => {
                    dispatch(updateTodolistAC({todolist: currentTodolist, todolistId}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                })
                .catch((error) => {
                    handleServerNetworkError(error, dispatch)
                })
        }
    }
}


// --------- TYPES ---------
export type FilterValuesType = 'all' | 'completed' | 'active';

export type TodolistType = TodolistTypeAPI & {
    filter: FilterValuesType;
    entityStatus: RequestStatusType
};