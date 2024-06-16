import { RequestStatusType } from "common/types"

export type TodolistTypeApi = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type ChangeTodolistArgs = {
    todolistId: string
    title: string
}

export type FilterValuesType = "all" | "completed" | "active"

export type TodolistType = TodolistTypeApi & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
