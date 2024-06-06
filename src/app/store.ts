import { UnknownAction } from "redux"
import { todolistsReducer } from "features/TodolistList/todolists-reducer"
import { tasksReducer } from "features/TodolistList/Todolist/Tasks/tasks-reducer"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { appReducer } from "app/app-reducer"
import { authReducer } from "features/auth/model/auth-reducer"
import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
    reducer: {
        todolists: todolistsReducer,
        tasks: tasksReducer,
        auth: authReducer,
        app: appReducer,
    },
})

export type StoreType = typeof store.getState

export type AppRootStateType = ReturnType<StoreType>

export type AppThunkDispatch = typeof store.dispatch
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, UnknownAction>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, UnknownAction>

// @ts-ignore
window.store = store
