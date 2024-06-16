import { instance } from "common/instance"
import { BaseResponseType } from "common/types"
import {
    CreateTaskArgs,
    GetTasksResponse,
    RemoveTaskArg,
    TaskType,
    UpdateTaskArgs,
} from "features/TodolistList/api/tasks.types"

export const taskApi = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTask({ todolistId, title }: CreateTaskArgs) {
        return instance.post<BaseResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, { title })
    },
    deleteTask({ todolistId, taskId }: RemoveTaskArg) {
        return instance.delete<BaseResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask({ todolistId, taskId, domainModel }: UpdateTaskArgs) {
        return instance.put<BaseResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, domainModel)
    },
}
