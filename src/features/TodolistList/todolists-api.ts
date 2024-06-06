// --------- API ---------
import { instance } from "common/instance"
import { BaseResponseType } from "common/types"

export const todolistsApi = {
    getTodolists() {
        return instance.get<TodolistTypeAPI[]>("todo-lists")
    },
    createTodolist(title: string) {
        return instance.post<BaseResponseType<{ item: TodolistTypeAPI }>>("todo-lists", { title })
    },
    deleteTodolist(id: string) {
        return instance.delete<BaseResponseType>(`todo-lists/${id}`)
    },
    updateTodolist({ todolistId, title }: ChangeTodolistArgs) {
        return instance.put<BaseResponseType>(`todo-lists/${todolistId}`, { title })
    },
}

// --------- TYPES ---------
export type ChangeTodolistArgs = {
    todolistId: string
    title: string
}

export type TodolistTypeAPI = {
    id: string
    addedDate: string
    order: number
    title: string
}
