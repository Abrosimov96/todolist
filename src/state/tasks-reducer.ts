import {v1} from 'uuid';
import {TaskPriorities, TaskStatuses, TaskType} from '../api/task-api';
import {AddTodolistActionType, RemoveTodolistActionType,} from './todolists-reducer';

export type TasksStateType = {
    [key: string]: Array<TaskType>;
};

type ActionsType =
    | RemoveTaskActionType
    | AddTaskActionType
    | ChangeStatusTaskActionType
    | ChangeTitleTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType;

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType,): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state, [action.todolistId]: state[action.todolistId].filter(
                    (t) => t.id !== action.taskId,
                )
            };
        }
        case 'ADD-TASK': {
            const newTask = {
                id: v1(),
                title: action.title,
                status: TaskStatuses.New, priority: TaskPriorities.Low, description: '', order: 0, deadline: '', startDate: '', addedDate: '', todoListId: action.todolistId
            };
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]};
        }
        case 'CHANGE-STATUS-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task =>
                    task.id === action.taskId ? {...task, status: action.status} : task)
            };
        }
        case 'CHANGE-TITLE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(task => task.id === action.taskId
                        ? {...task, title: action.title} : task)
            };
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todolistId]: []};
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy;
        }
        default:
            return state
    }
};

// --------- ACTION CREATORS ---------
type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (taskId: string, todolistId: string,) => {
    return {type: 'REMOVE-TASK', todolistId, taskId} as const;
};

type AddTaskActionType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todolistId: string,) => {
    return {type: 'ADD-TASK', title, todolistId} as const;
};

type ChangeStatusTaskActionType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string,) => {
    return {type: 'CHANGE-STATUS-TASK', taskId, status, todolistId} as const;
};

type ChangeTitleTaskActionType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: 'CHANGE-TITLE-TASK', taskId, title, todolistId} as const;
};
