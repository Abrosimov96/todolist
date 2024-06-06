import { instance } from "common/instance"
import { TaskPriorities, TaskStatuses } from "common/enums/enums"
import { BaseResponseType, RequestStatusType } from "common/types"

export const taskApi = {
    getTasks(todolistId: string) {
        return instance.get<GetResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<BaseResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, { title })
    },
    deleteTask({ todolistId, taskId }: RemoveTaskArgs) {
        return instance.delete<BaseResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask({ todolistId, taskId, domainModel }: UpdateTaskArgs) {
        return instance.put<BaseResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, domainModel)
    },
}

export type UpdateTaskArgs = {
    taskId: string
    domainModel: Partial<UpdateTaskModelType>
    todolistId: string
}

export type RemoveTaskArgs = {
    todolistId: string
    taskId: string
}

// --------- TYPES ---------
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
