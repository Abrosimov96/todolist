import {
    RemoveTaskArgs,
    taskApi,
    TaskType,
    UpdateTaskArgs,
    UpdateTaskModelType,
} from "features/TodolistList/Todolist/Tasks/task-api"
import { appActions } from "app/app-reducer"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TodolistTypeAPI } from "features/TodolistList/todolists-api"
import { todolistsActions, todolistsThunk } from "features/TodolistList/todolists-reducer"
import { clearTasksAndTodolists } from "common/actions/common.actions"
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from "common/utils"
import { ResultCode } from "common/enums"
import { RequestStatusType } from "common/types"

const initialState: TasksStateType = {}

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        changeTasksStatusAC(
            state,
            action: PayloadAction<{
                todolistId: string
                taskId: string
                status: RequestStatusType
            }>,
        ) {
            const indexTask = state[action.payload.todolistId].findIndex((task) => task.id === action.payload.taskId)
            if (indexTask > -1) state[action.payload.todolistId][indexTask].entityStatus = action.payload.status
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex((t) => t.id === action.payload.taskId)
                if (index !== -1) tasks.splice(index, 1)
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state[action.payload.task.todoListId].unshift(action.payload.task)
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId]
                const indexTask = tasks.findIndex((task) => task.id === action.payload.taskId)
                if (indexTask > -1) tasks[indexTask] = { ...tasks[indexTask], ...action.payload.domainModel }
            })
            .addCase(todolistsThunk.getTodolists.fulfilled, (state, action) => {
                action.payload.todolists.forEach((t: TodolistTypeAPI) => (state[t.id] = []))
            })
            .addCase(todolistsThunk.removeTodolist.fulfilled, (state, action) => {
                delete state[action.payload.todolistId]
            })
            .addCase(todolistsThunk.addTodolist.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(clearTasksAndTodolists, () => {
                return {}
            })
    },
    selectors: {
        selectTasks: (sliceState) => sliceState,
    },
})

export const fetchTasks = createAppAsyncThunk<{ todolistId: string; tasks: TaskType[] }, string>(
    `${taskSlice.name}/fetchTasks`,
    async (todolistId, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI
        try {
            dispatch(appActions.setAppStatusAC({ status: "loading" }))
            const res = await taskApi.getTasks(todolistId)
            dispatch(appActions.setAppStatusAC({ status: "succeeded" }))
            return { todolistId, tasks: res.data.items }
        } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
    },
)

export const removeTask = createAppAsyncThunk<RemoveTaskArgs, RemoveTaskArgs>(
    `${taskSlice.name}/removeTask`,
    async (arg, thunkAPI) => {
        const { taskId, todolistId } = arg
        const { dispatch, rejectWithValue } = thunkAPI
        try {
            dispatch(appActions.setAppStatusAC({ status: "loading" }))
            dispatch(tasksAction.changeTasksStatusAC({ todolistId, taskId, status: "loading" }))
            await taskApi.deleteTask(arg)
            dispatch(appActions.setAppStatusAC({ status: "succeeded" }))
            dispatch(tasksAction.changeTasksStatusAC({ todolistId, taskId, status: "succeeded" }))
            return { todolistId, taskId }
        } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
    },
)

export const addTask = createAppAsyncThunk<{ task: TaskType }, { todolistId: string; title: string }>(
    `${taskSlice.name}/addTask`,
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI
        const { todolistId, title } = arg
        try {
            dispatch(appActions.setAppStatusAC({ status: "loading" }))
            dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, status: "loading" }))
            const res = await taskApi.createTask(todolistId, title)
            if (res.data.resultCode === ResultCode.success) {
                dispatch(appActions.setAppStatusAC({ status: "succeeded" }))
                dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, status: "succeeded" }))
                return { task: res.data.data.item }
            } else {
                dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, status: "failed" }))
                handleServerAppError(res.data, dispatch)
                return rejectWithValue(null)
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
    },
)

export const updateTask = createAppAsyncThunk<UpdateTaskArgs, UpdateTaskArgs>(
    `${taskSlice.name}/updateTask`,
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue, getState } = thunkAPI
        const { todolistId, taskId, domainModel } = arg
        try {
            dispatch(appActions.setAppStatusAC({ status: "loading" }))
            dispatch(tasksAction.changeTasksStatusAC({ todolistId, taskId, status: "loading" }))
            const task = getState().tasks[todolistId].find((t) => t.id === taskId)

            if (!task) {
                console.warn("task not found in the state")
                return rejectWithValue(null)
            }

            const apiModel: UpdateTaskModelType = {
                title: task.title,
                startDate: task.startDate,
                deadline: task.deadline,
                priority: task.priority,
                description: task.description,
                status: task.status,
                ...domainModel,
            }
            const res = await taskApi.updateTask({ todolistId, taskId, domainModel: apiModel })
            if (res.data.resultCode === ResultCode.success) {
                dispatch(appActions.setAppStatusAC({ status: "succeeded" }))
                dispatch(tasksAction.changeTasksStatusAC({ todolistId, taskId, status: "succeeded" }))
                return arg
            } else {
                dispatch(tasksAction.changeTasksStatusAC({ todolistId, taskId, status: "failed" }))
                handleServerAppError(res.data, dispatch)
                return rejectWithValue(null)
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
    },
)

// --------- TYPES ---------
export type TasksStateType = Record<string, TaskType[]>

export const tasksReducer = taskSlice.reducer
export const tasksAction = taskSlice.actions
export const tasksThunks = { removeTask, addTask, updateTask, fetchTasks }
export const { selectTasks } = taskSlice.selectors
