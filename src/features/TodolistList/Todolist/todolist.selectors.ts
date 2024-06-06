import { AppRootStateType } from "app/store"
import { TodolistType } from "features/TodolistList/todolists-reducer"

export const todolistSelectors = (store: AppRootStateType): TodolistType[] => store.todolists
