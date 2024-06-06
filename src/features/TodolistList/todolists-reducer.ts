import { ChangeTodolistArgs, todolistsApi, TodolistTypeAPI } from "features/TodolistList/todolists-api"
import { appActions } from "app/app-reducer"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { tasksThunks } from "features/TodolistList/Todolist/Tasks/tasks-reducer"
import { clearTasksAndTodolists } from "common/actions/common.actions"
import { createAppAsyncThunk, handleServerNetworkError } from "common/utils"
import { RequestStatusType } from "common/types"

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

const getTodolists = createAppAsyncThunk<{ todolists: TodolistTypeAPI[] }, void>(
    `${todolistSlice.name}/getTodolists`,
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI
        try {
            dispatch(appActions.setAppStatusAC({ status: "loading" }))
            const res = await todolistsApi.getTodolists()
            dispatch(appActions.setAppStatusAC({ status: "succeeded" }))
            res.data.forEach((todolist) => dispatch(tasksThunks.fetchTasks(todolist.id)))
            return { todolists: res.data }
        } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
    },
)
const removeTodolist = createAppAsyncThunk<{ todolistId: string }, { todolistId: string }>(
    `${todolistSlice.name}/deleteTodolist`,
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI
        try {
            dispatch(appActions.setAppStatusAC({ status: "loading" }))
            await todolistsApi.deleteTodolist(arg.todolistId)
            dispatch(appActions.setAppStatusAC({ status: "succeeded" }))
            return { todolistId: arg.todolistId }
        } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
    },
)
const addTodolist = createAppAsyncThunk<{ todolist: TodolistTypeAPI }, { title: string }>(
    `${todolistSlice.name}/addTodolist`,
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI
        try {
            dispatch(appActions.setAppStatusAC({ status: "loading" }))
            const res = await todolistsApi.createTodolist(arg.title)
            dispatch(appActions.setAppStatusAC({ status: "succeeded" }))
            return { todolist: res.data.data.item }
        } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
    },
)
const changeTodolistTitle = createAppAsyncThunk<ChangeTodolistArgs, ChangeTodolistArgs>(
    `${todolistSlice.name}/changeTodolistTitle`,
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue, getState } = thunkAPI
        const { todolistId } = arg
        try {
            if (getState().todolists) {
                const currentTodolist = getState().todolists.find((tl) => tl.id === todolistId)
                if (currentTodolist !== undefined) {
                    dispatch(appActions.setAppStatusAC({ status: "loading" }))
                    dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, status: "loading" }))
                    await todolistsApi.updateTodolist(arg)
                    dispatch(appActions.setAppStatusAC({ status: "succeeded" }))
                    dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, status: "succeeded" }))
                    return arg
                }
                return rejectWithValue(null)
            }
            return rejectWithValue(null)
        } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
    },
)

// --------- TYPES ---------
export type FilterValuesType = "all" | "completed" | "active"

export type TodolistType = TodolistTypeAPI & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export const todolistsReducer = todolistSlice.reducer
export const todolistsThunk = { getTodolists, removeTodolist, addTodolist, changeTodolistTitle }

// --------- ACTION CREATORS ---------
export const todolistsActions = todolistSlice.actions
export const { selectTodolists } = todolistSlice.selectors
