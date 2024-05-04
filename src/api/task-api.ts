import axios from 'axios';
import {RequestStatusType} from '../state/app-reducer';

// --------- SETTINGS AXIOS ---------
const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'c86ec8cb-1eec-4043-b253-d88640c02776'
    }
}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists',
    ...settings
})

// --------- API ---------
export const taskApi = {
    getTasks(todolistId: string) {
        return instance.get<GetResponseType>(`/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{item:  TaskType }>>(`/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, task: UpdateTaskModelType) {
        return instance.put<ResponseType<TaskType>>(`/${todolistId}/tasks/${taskId}`, task)
    }
}

// --------- TYPES ---------
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    High = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
    entityStatus: RequestStatusType
}
type GetResponseType = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}
type ResponseType<Data = {}> = {
    resultCode: number,
    messages: string[],
    data: Data
}