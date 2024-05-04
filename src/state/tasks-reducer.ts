import {taskApi, TaskType, UpdateTaskModelType} from '../api/task-api';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType,} from './todolists-reducer';
import {AppRootStateType, RootDispatchActionType} from './store';
import {setAppStatusAC} from './app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TaskActionsType,): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            };
        case 'ADD-TASK':
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            };
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(task => task.id === action.taskId ? {...task, ...action.model} : task)
            };
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []};
        case 'REMOVE-TODOLIST':
            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy;
        case 'SET-TODOLISTS': {
            const copyState = {...state}
            action.todolists.forEach(t => {
                copyState[t.id] = []
            })
            return copyState
        }
        case 'SET-TASKS': {
            return {
                ...state,
                [action.todolistId]: action.tasks
            }
        }
        default:
            return state
    }
};

// --------- ACTION CREATORS ---------
export const removeTaskAC = (taskId: string, todolistId: string,) => {
    return {type: 'REMOVE-TASK', todolistId, taskId} as const;
};
export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const;
};
export const updateTaskAC = (taskId: string, model: Partial<UpdateTaskModelType>, todolistId: string,) => {
    return {type: 'UPDATE-TASK', taskId, model, todolistId} as const;
};
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {type: 'SET-TASKS', todolistId, tasks} as const;
};

// --------- THUNK CREATORS ---------
export const fetchTasksTC = (todolistId: string) => (dispatch: RootDispatchActionType) => {
    dispatch(setAppStatusAC('loading'))
    taskApi.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(todolistId, res.data.items))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: RootDispatchActionType) => {
    dispatch(setAppStatusAC('loading'))
    taskApi.deleteTask(todolistId, taskId)
        .then(() => {
            dispatch(removeTaskAC(taskId, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: RootDispatchActionType) => {
    dispatch(setAppStatusAC('loading'))
    taskApi.createTask(todolistId, title)
        .then(res => {
            if (!res.data.resultCode) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: Partial<UpdateTaskModelType>) =>
    (dispatch: RootDispatchActionType, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAC('loading'))
        const task = getState().tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            console.warn('task not found in the state')
            return
        }
        const apiModel: UpdateTaskModelType = {
            title: task.title,
            startDate: task.startDate,
            deadline: task.deadline,
            priority: task.priority,
            description: task.description,
            status: task.status,
            ...domainModel
        }
        taskApi.updateTask(todolistId, taskId, apiModel)
            .then((res) => {
                if (!res.data.resultCode) {
                    dispatch(updateTaskAC(taskId, apiModel, todolistId))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }

// --------- TYPES ---------
export type TaskActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>;

export type TasksStateType = {
    [key: string]: Array<TaskType>;
};
