import { TaskPriorities, TaskStatuses } from "common/enums"
import { RequestStatusType } from "common/types"

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

export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

export type UpdateTaskArgs = {
    taskId: string
    domainModel: Partial<UpdateTaskModelType>
    todolistId: string
}

export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export type RemoveTaskArg = {
    todolistId: string
    taskId: string
}

export type UpdateTodolistTitleArgType = {
    id: string
    title: string
}

export type CreateTaskArgs = {
    todolistId: string
    title: string
}
