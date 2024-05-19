import axios from 'axios';

// --------- SETTINGS AXIOS ---------
export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '2800ad43-9529-4c23-8608-2e6f8b2f9c1a'
    }
})

// --------- API ---------
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

// --------- TYPES ---------
export type TodolistTypeAPI = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type ResponseType<Data = {}> = {
    resultCode: number,
    messages: string[],
    data: Data
}