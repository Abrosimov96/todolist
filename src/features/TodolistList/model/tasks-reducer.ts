import { taskApi } from "features/TodolistList/api/task-api"
import { appActions } from "app/app-reducer"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { todolistsThunk } from "features/TodolistList/model/todolists-reducer"
import { clearTasksAndTodolists } from "common/actions/common.actions"
import { createAppAsyncThunk, handleServerAppError } from "common/utils"
import { ResultCode } from "common/enums"
import { RequestStatusType } from "common/types"
import { RemoveTaskArg, TaskType, UpdateTaskArgs, UpdateTaskModelType } from "features/TodolistList/api/tasks.types"

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
                action.payload.todolists.forEach((t) => (state[t.id] = []))
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
        const res = await taskApi.getTasks(todolistId)
        const tasks = res.data.items
        return { tasks, todolistId }
    },
)

export const removeTask = createAppAsyncThunk<RemoveTaskArg, RemoveTaskArg>(
    `${taskSlice.name}/removeTask`,
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI
        const res = await taskApi.deleteTask(arg)
        if (res.data.resultCode === ResultCode.success) {
            return arg
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    },
)

export const addTask = createAppAsyncThunk<{ task: TaskType }, { todolistId: string; title: string }>(
    `${taskSlice.name}/addTask`,
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI
        const res = await taskApi.createTask(arg)
        if (res.data.resultCode === ResultCode.success) {
            const task = res.data.data.item
            return { task }
        } else {
            handleServerAppError(res.data, dispatch, false)
            return rejectWithValue(res.data)
        }
    },
)

export const updateTask = createAppAsyncThunk<UpdateTaskArgs, UpdateTaskArgs>(
    `${taskSlice.name}/updateTask`,
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue, getState } = thunkAPI
        const { taskId, todolistId } = arg
        const state = getState()
        const task = state.tasks[todolistId].find((t) => t.id === taskId)
        if (!task) {
            dispatch(appActions.setAppErrorAC({ error: "Task not found in the state" }))
            return rejectWithValue(null)
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...arg.domainModel,
        }

        const res = await taskApi.updateTask({ todolistId, taskId, domainModel: apiModel })
        if (res.data.resultCode === ResultCode.success) {
            return arg
        } else {
            handleServerAppError(res.data, dispatch)
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
