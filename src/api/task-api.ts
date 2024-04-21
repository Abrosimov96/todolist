import axios from 'axios';

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

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
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
    message: string[],
    data: Data
}


export const taskApi = {
    getTasks(todolistId: string) {
        return instance.get<GetResponseType>(`/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<TaskType>>(`/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<ResponseType<TaskType>>(`/${todolistId}/tasks/${taskId}`, {title})
    }
}