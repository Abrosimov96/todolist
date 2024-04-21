import axios from 'axios';

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'c86ec8cb-1eec-4043-b253-d88640c02776'
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export type TodolistTypeAPI = {
    id: string
    addedDate: string
    order: number
    title: string
}

type ResponseType<Data = {}> = {
    resultCode: number,
    message: string[],
    data: Data
}


export const todolistsApi = {
    getTodolists() {
        return instance.get<TodolistTypeAPI[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistTypeAPI }>>('todo-lists', {title})
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title})
    }
}