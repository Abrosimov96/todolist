import {v1} from 'uuid';
import {TasksStateType} from '../App';
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
} from './todolists-reducer';

type RemoveTaskActionType = {
    type: 'REMOVE-TASK';
    todolistId: string;
    taskId: string;
};

type AddTaskActionType = {
    type: 'ADD-TASK';
    title: string;
    todolistId: string;
};

type ChangeStatusTaskActionType = {
    type: 'CHANGE-STATUS-TASK';
    taskId: string;
    isDone: boolean;
    todolistId: string;
};

type ChangeTitleTaskActionType = {
    type: 'CHANGE-TITLE-TASK';
    taskId: string;
    title: string;
    todolistId: string;
};

type ActionsType =
    | RemoveTaskActionType
    | AddTaskActionType
    | ChangeStatusTaskActionType
    | ChangeTitleTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType;

export const tasksReducer = (
    state: TasksStateType,
    action: ActionsType,
): TasksStateType => {
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
                isDone: false,
            };
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]};
        }
        case 'CHANGE-STATUS-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(task => task.id === action.taskId
                        ? {...task, isDone: action.isDone} : task)
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

export const removeTaskAC = (
    taskId: string,
    todolistId: string,
): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId, taskId};
};

export const addTaskAC = (
    title: string,
    todolistId: string,
): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId};
};

export const changeTaskStatusAC = (
    taskId: string,
    isDone: boolean,
    todolistId: string,
): ChangeStatusTaskActionType => {
    return {type: 'CHANGE-STATUS-TASK', taskId, isDone, todolistId};
};

export const changeTaskTitleAC = (
    taskId: string,
    title: string,
    todolistId: string,
): ChangeTitleTaskActionType => {
    return {type: 'CHANGE-TITLE-TASK', taskId, title, todolistId};
};
