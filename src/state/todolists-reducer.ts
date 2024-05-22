import {todolistsApi, TodolistTypeAPI} from '../api/todolists-api';
import {RequestStatusType, setAppStatusAC} from './app-reducer';
import {AppThunkType} from './store';
import {handleServerNetworkError} from '../utils/error-utils';
import {fetchTasksTC} from './tasks-reducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createAppAsyncThunk} from './createAppAsyncThunk';

const initialState: TodolistType[] = []

const todolistSlice = createSlice({
    name: 'todolist',
    initialState,
    reducers: {
        removeTodolist(state, action: PayloadAction<{ todolistId: string }>) {
            const index = state.findIndex(todolist => todolist.id === action.payload.todolistId)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolist(state, action: PayloadAction<{ todolist: TodolistTypeAPI }>) {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        setTodolists(state, action: PayloadAction<{ todolists: TodolistTypeAPI[] }>) {
            return action.payload.todolists.map(todolist => ({...todolist, filter: 'all', entityStatus: 'idle'}))
        },
        changeTodolistFilter(state, action: PayloadAction<{ todolistId: string, filter: FilterValuesType }>) {
            const index = state.findIndex(todo => todo.id === action.payload.todolistId)
            if (index > -1) {
                state[index].filter = action.payload.filter
            }
        },
        changeTodolistTitle(state, action: PayloadAction<{ todolistId: string, title: string }>) {
            const index = state.findIndex(todo => todo.id === action.payload.todolistId)
            if (index > -1) {
                state[index].title = action.payload.title
            }
        },
        changeTodolistEntityStatus(state, action: PayloadAction<{ todolistId: string, status: RequestStatusType }>) {
            const index = state.findIndex(todo => todo.id === action.payload.todolistId)
            if (index > -1) {
                state[index].entityStatus = action.payload.status
            }
        },
        clearTasksAndTodolists(state) {
            return []
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getTodolists.fulfilled, (state, action) => {
                return action.payload.todolists.map(todo => ({...todo, filter: 'all', entityStatus: 'idle'}))
            })
    }
})

const getTodolists = createAppAsyncThunk<{ todolists: TodolistTypeAPI[] }, void>('todos/getTodolists',
    async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todolistsApi.getTodolists()
        dispatch(setAppStatusAC({status: 'succeeded'}))
        return {todolists: res.data}
    } catch (e) {
        return rejectWithValue(null)
    }
})

export const todolistsReducer = todolistSlice.reducer
export const todolistsThunk = {getTodolists}


// --------- ACTION CREATORS ---------
export const {
    removeTodolist,
    addTodolist,
    setTodolists,
    changeTodolistFilter,
    changeTodolistTitle,
    changeTodolistEntityStatus,
    clearTasksAndTodolists
} = todolistSlice.actions

// --------- THUNK CREATORS ---------
export const fetchTodolistsTC = (): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsApi.getTodolists()
        .then(res => {
            dispatch(setTodolists({todolists: res.data}))
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
            dispatch(changeTodolistEntityStatus({todolistId, status: 'loading'}))
            todolistsApi.deleteTodolist(todolistId)
                .then(res => {
                    dispatch(removeTodolist({todolistId}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                })
                .catch((error) => {
                    handleServerNetworkError(error, dispatch)
                    dispatch(changeTodolistEntityStatus({todolistId, status: 'idle'}))
                })
        }
    }
}
export const addTodolistTC = (title: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsApi.createTodolist(title)
        .then(res => {
            dispatch(addTodolist({todolist: res.data.data.item}))
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
            dispatch(changeTodolistEntityStatus({todolistId, status: 'loading'}))
            todolistsApi.updateTodolist(todolistId, title)
                .then(res => {
                    dispatch(changeTodolistTitle({todolistId, title}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                    dispatch(changeTodolistEntityStatus({todolistId, status: 'succeeded'}))
                })
                .catch((error) => {
                    handleServerNetworkError(error, dispatch)
                    dispatch(changeTodolistEntityStatus({todolistId, status: 'idle'}))
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