import { AppRootStateType } from "app/store"
import { createSelector } from "@reduxjs/toolkit"

export const selectAllTasks = (state: AppRootStateType) => state.tasks

export const selectCurrentTasks = (todolistId: string) =>
    createSelector([selectAllTasks], (tasks) => {
        return tasks[todolistId]
    })
