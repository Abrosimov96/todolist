import { todolistsApi } from "features/TodolistList/api/todolists-api"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { tasksThunks } from "features/TodolistList/model/tasks-reducer"
import { clearTasksAndTodolists } from "common/actions/common.actions"
import { createAppAsyncThunk, handleServerAppError } from "common/utils"
import { RequestStatusType } from "common/types"
import { ResultCode } from "common/enums"
import {
    ChangeTodolistArgs,
    FilterValuesType,
    TodolistType,
    TodolistTypeApi,
} from "features/TodolistList/api/todolists.types"

const initialState: TodolistType[] = []

const todolistSlice = createSlice({
    name: "todolist",
    initialState,
    reducers: {
        changeTodolistFilter(state, action: PayloadAction<{ todolistId: string; filter: FilterValuesType }>) {
            const index = state.findIndex((todo) => todo.id === action.payload.todolistId)
            if (index > -1) {
                state[index].filter = action.payload.filter
            }
        },
        changeTodolistEntityStatus(state, action: PayloadAction<{ todolistId: string; status: RequestStatusType }>) {
            const index = state.findIndex((todo) => todo.id === action.payload.todolistId)
            if (index > -1) {
                state[index].entityStatus = action.payload.status
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTodolists.fulfilled, (state, action) => {
                return action.payload.todolists.map((todo) => ({ ...todo, filter: "all", entityStatus: "idle" }))
            })
            .addCase(removeTodolist.fulfilled, (state, action) => {
                const index = state.findIndex((todolist) => todolist.id === action.payload.todolistId)
                if (index > -1) {
                    state.splice(index, 1)
                }
            })
            .addCase(addTodolist.fulfilled, (state, action) => {
                state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
            })
            .addCase(changeTodolistTitle.fulfilled, (state, action) => {
                const index = state.findIndex((todo) => todo.id === action.payload.todolistId)
                if (index > -1) {
                    state[index].title = action.payload.title
                }
            })
            .addCase(clearTasksAndTodolists, () => {
                return []
            })
    },
    selectors: {
        selectTodolists: (sliceState) => sliceState,
    },
})

const getTodolists = createAppAsyncThunk<{ todolists: TodolistTypeApi[] }, void>(
    `${todolistSlice.name}/getTodolists`,
    async (_, thunkAPI) => {
        const { dispatch } = thunkAPI
        const res = await todolistsApi.getTodolists()
        res.data.forEach((todolist) => dispatch(tasksThunks.fetchTasks(todolist.id)))
        return { todolists: res.data }
    },
)
const removeTodolist = createAppAsyncThunk<{ todolistId: string }, { todolistId: string }>(
    `${todolistSlice.name}/deleteTodolist`,
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI
        const { todolistId } = arg
        dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, status: "loading" }))
        const res = await todolistsApi.deleteTodolist(todolistId)
        if (res.data.resultCode === ResultCode.success) {
            return { todolistId }
        } else {
            return rejectWithValue(res.data)
        }
    },
)
const addTodolist = createAppAsyncThunk<{ todolist: TodolistTypeApi }, { title: string }>(
    `${todolistSlice.name}/addTodolist`,
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI
        const res = await todolistsApi.createTodolist(arg.title)
        if (res.data.resultCode === ResultCode.success) {
            return { todolist: res.data.data.item }
        } else {
            handleServerAppError(res.data, dispatch, false)
            return rejectWithValue(res.data)
        }
    },
)
const changeTodolistTitle = createAppAsyncThunk<ChangeTodolistArgs, ChangeTodolistArgs>(
    `${todolistSlice.name}/changeTodolistTitle`,
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI
        const res = await todolistsApi.updateTodolist(arg)
        if (res.data.resultCode === ResultCode.success) {
            return arg
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(res.data)
        }
    },
)

export const todolistsReducer = todolistSlice.reducer
export const todolistsThunk = { getTodolists, removeTodolist, addTodolist, changeTodolistTitle }

// --------- ACTION CREATORS ---------
export const todolistsActions = todolistSlice.actions
export const { selectTodolists } = todolistSlice.selectors
