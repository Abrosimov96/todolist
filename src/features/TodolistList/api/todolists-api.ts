import { instance } from "common/instance"
import { BaseResponseType } from "common/types"
import { ChangeTodolistArgs, TodolistTypeApi } from "features/TodolistList/api/todolists.types"

export const todolistsApi = {
    getTodolists() {
        return instance.get<TodolistTypeApi[]>("todo-lists")
    },
    createTodolist(title: string) {
        return instance.post<BaseResponseType<{ item: TodolistTypeApi }>>("todo-lists", { title })
    },
    deleteTodolist(id: string) {
        return instance.delete<BaseResponseType>(`todo-lists/${id}`)
    },
    updateTodolist({ todolistId, title }: ChangeTodolistArgs) {
        return instance.put<BaseResponseType>(`todo-lists/${todolistId}`, { title })
    },
}
