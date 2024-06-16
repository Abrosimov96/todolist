import { Provider } from "react-redux"
import { AppRootStateType } from "app/store"
import { applyMiddleware, combineReducers, legacy_createStore } from "redux"
import { tasksReducer } from "features/TodolistList/model/tasks-reducer"
import { todolistsReducer } from "features/TodolistList/model/todolists-reducer"
import { v1 } from "uuid"
import { appReducer } from "app/app-reducer"
import thunk from "redux-thunk"
import { authReducer } from "features/auth/model/auth-reducer"
import { MemoryRouter } from "react-router-dom"
import React, { ReactNode } from "react"
import { TaskPriorities, TaskStatuses } from "common/enums/enums"

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    auth: authReducer,
    app: appReducer,
})

const initialState: AppRootStateType = {
    todolists: [
        { id: "todolistId1", title: "What to learn", filter: "all", addedDate: "", order: 0, entityStatus: "idle" },
        { id: "todolistId2", title: "What to buy", filter: "all", addedDate: "", order: 0, entityStatus: "loading" },
    ],
    tasks: {
        todolistId1: [
            {
                id: v1(),
                title: "CSS",
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                startDate: "",
                addedDate: "",
                deadline: "",
                order: 0,
                description: "",
                priority: TaskPriorities.High,
                entityStatus: "idle",
            },
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                startDate: "",
                addedDate: "",
                deadline: "",
                order: 0,
                description: "",
                priority: TaskPriorities.High,
                entityStatus: "idle",
            },
            {
                id: v1(),
                title: "React",
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                startDate: "",
                addedDate: "",
                deadline: "",
                order: 0,
                description: "",
                priority: TaskPriorities.High,
                entityStatus: "idle",
            },
            {
                id: v1(),
                title: "TypeScript",
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                startDate: "",
                addedDate: "",
                deadline: "",
                order: 0,
                description: "",
                priority: TaskPriorities.High,
                entityStatus: "idle",
            },
        ],
        todolistId2: [
            {
                id: v1(),
                title: "Book",
                status: TaskStatuses.Completed,
                todoListId: "todolistId2",
                startDate: "",
                addedDate: "",
                deadline: "",
                order: 0,
                description: "",
                priority: TaskPriorities.High,
                entityStatus: "idle",
            },
            {
                id: v1(),
                title: "Milk",
                status: TaskStatuses.Completed,
                todoListId: "todolistId2",
                startDate: "",
                addedDate: "",
                deadline: "",
                order: 0,
                description: "",
                priority: TaskPriorities.High,
                entityStatus: "idle",
            },
        ],
    },
    auth: {
        isAuthorized: true,
    },
    app: {
        status: "idle",
        error: null,
        isInitialized: false,
    },
}

// @ts-ignore
export const storyBookStore = legacy_createStore(rootReducer, initialState, applyMiddleware(thunk))

export const ReduxStoreProviderDecorator = (storyFn: () => ReactNode) => {
    return (
        <Provider store={storyBookStore}>
            <MemoryRouter>{storyFn()}</MemoryRouter>
        </Provider>
    )
}
