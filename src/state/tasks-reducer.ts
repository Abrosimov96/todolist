import {taskApi, TaskType, UpdateTaskModelType} from '../api/task-api';
import {AppRootStateType, AppThunkType} from './store';
import {RequestStatusType, setAppStatusAC} from './app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';
import {
    addTodolist,
    changeTodolistEntityStatus,
    clearTasksAndTodolists,
    removeTodolist,
    setTodolists
} from './todolists-reducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TodolistTypeAPI} from '../api/todolists-api';

const initialState: TasksStateType = {}

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ todolistId: string, taskId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(todo => todo.id === action.payload.taskId)
            if (index > -1) tasks.splice(index, 1)
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC(state, action: PayloadAction<{
            todolistId: string,
            taskId: string,
            model: Partial<UpdateTaskModelType>
        }>) {
            const tasks = state[action.payload.todolistId]
            const indexTask = tasks.findIndex(task => task.id === action.payload.taskId)
            if (indexTask > -1) tasks[indexTask] = {...tasks[indexTask], ...action.payload.model}
        },
        setTasksAC(state, action: PayloadAction<{ todolistId: string, tasks: TaskType[] }>) {
            state[action.payload.todolistId] = action.payload.tasks
        },
        changeTasksStatusAC(state, action: PayloadAction<{
            todolistId: string,
            taskId: string,
            status: RequestStatusType
        }>) {

            const indexTask = state[action.payload.todolistId].findIndex(task => task.id === action.payload.taskId)
            if (indexTask > -1) state[action.payload.todolistId][indexTask].entityStatus = action.payload.status
        }
    },
    extraReducers:(builder) => {
        builder
            .addCase(setTodolists, (state, action) => {
                action.payload.todolists.forEach((t: TodolistTypeAPI) => state[t.id] = [])
            })
            .addCase(removeTodolist, (state, action) => {
                delete state[action.payload.todolistId];
            })
            .addCase(addTodolist, (state, action) => {
                state[action.payload.todolist.id] = [];
            })
            .addCase(clearTasksAndTodolists, () => {
                return {}
            })

    }
})

export const tasksReducer = taskSlice.reducer

// --------- ACTION CREATORS ---------
export const {
    removeTaskAC,
    addTaskAC,
    updateTaskAC,
    setTasksAC,
    changeTasksStatusAC
} = taskSlice.actions

// --------- THUNK CREATORS ---------
export const fetchTasksTC = (todolistId: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    taskApi.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC({todolistId, tasks: res.data.items}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const removeTaskTC = (todolistId: string, taskId: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTasksStatusAC({todolistId, taskId, status: 'loading'}))
    taskApi.deleteTask(todolistId, taskId)
        .then(() => {
            dispatch(removeTaskAC({todolistId, taskId}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
            dispatch(changeTasksStatusAC({todolistId, taskId, status: 'succeeded'}))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
            dispatch(changeTasksStatusAC({todolistId, taskId, status: 'failed'}))
        })
}
export const addTaskTC = (todolistId: string, title: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistEntityStatus({todolistId, status: 'loading'}))
    taskApi.createTask(todolistId, title)
        .then(res => {
            if (!res.data.resultCode) {
                dispatch(addTaskAC({task: res.data.data.item}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
                dispatch(changeTodolistEntityStatus({todolistId, status: 'succeeded'}))
            } else {
                dispatch(changeTodolistEntityStatus({todolistId, status: 'failed'}))
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            dispatch(changeTodolistEntityStatus({todolistId, status: 'failed'}))
            handleServerNetworkError(error, dispatch)
        })
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: Partial<UpdateTaskModelType>): AppThunkType =>
    (dispatch, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        dispatch(changeTasksStatusAC({todolistId, taskId, status: 'loading'}))
        const task = getState().tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            console.warn('task not found in the state')
            return
        }
        const model: UpdateTaskModelType = {
            title: task.title,
            startDate: task.startDate,
            deadline: task.deadline,
            priority: task.priority,
            description: task.description,
            status: task.status,
            ...domainModel
        }
        taskApi.updateTask(todolistId, taskId, model)
            .then((res) => {
                if (!res.data.resultCode) {
                    dispatch(updateTaskAC({taskId, model, todolistId}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                    dispatch(changeTasksStatusAC({todolistId, taskId, status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                    dispatch(changeTasksStatusAC({todolistId, taskId, status: 'failed'}))
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
                dispatch(changeTasksStatusAC({todolistId, taskId, status: 'failed'}))
            })
    }

// --------- TYPES ---------
export type TaskActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof changeTasksStatusAC>


export type TasksStateType = {
    [key: string]: Array<TaskType>;
};
