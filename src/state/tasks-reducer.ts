import {taskApi, TaskType, UpdateTaskModelType} from '../api/task-api';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType,} from './todolists-reducer';
import {Dispatch} from 'redux';
import {AppRootStateType} from './store';

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType,): TasksStateType => {
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
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string,) => {
    return {type: 'UPDATE-TASK', taskId, model, todolistId} as const;
};
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {type: 'SET-TASKS', todolistId, tasks} as const;
};

// --------- THUNK CREATORS ---------
export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        taskApi.getTasks(todolistId)
            .then(res => {
                dispatch(setTasksAC(todolistId, res.data.items))
            })
    }
}
export const removeTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        taskApi.deleteTask(todolistId, taskId)
            .then(res => {
                dispatch(removeTaskAC(taskId, todolistId))
            })
    }
}
export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        taskApi.createTask(todolistId, title)
            .then(res => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
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
            .then(res => {
                dispatch(updateTaskAC(taskId, apiModel, todolistId))
            })
    }
}

// --------- TYPES ---------
type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>;
type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>;
};
