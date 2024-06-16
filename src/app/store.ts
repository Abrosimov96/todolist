import { todolistsReducer } from "features/TodolistList/model/todolists-reducer"
import { tasksReducer } from "features/TodolistList/model/tasks-reducer"
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

export type AppRootStateType = ReturnType<typeof store.getState>

export type AppThunkDispatch = typeof store.dispatch
export type AppDispatch = typeof store.dispatch
