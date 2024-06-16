import { AppRootStateType } from "app/store"
import { TodolistType } from "features/TodolistList/api/todolists.types"

export const todolistSelectors = (store: AppRootStateType): TodolistType[] => store.todolists
