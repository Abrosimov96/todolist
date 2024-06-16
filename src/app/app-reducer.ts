import { createSlice, isFulfilled, isPending, isRejected, PayloadAction } from "@reduxjs/toolkit"
import { RequestStatusType } from "common/types"
import { todolistsThunk } from "features/TodolistList/model/todolists-reducer"

const initialState = {
    status: "idle",
    error: null as null | string,
    isInitialized: false,
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{ error: null | string }>) {
            state.error = action.payload.error
        },
        setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
            state.isInitialized = action.payload.isInitialized
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(isPending, (state) => {
                state.status = "loading"
            })
            .addMatcher(isFulfilled, (state) => {
                state.status = "succeeded"
            })
            .addMatcher(isRejected, (state, action: any) => {
                state.status = "failed"
                if (action.payload) {
                    if (action.type === todolistsThunk.addTodolist.rejected.type) return
                    state.error = action.payload.messages[0]
                } else {
                    state.error = action.error.message ? action.error.message : "Some error occurred"
                }
            })
    },
    selectors: {
        selectAppStatus: (sliceState) => sliceState.status,
        selectAppError: (sliceState) => sliceState.error,
        selectAppIsInitialized: (sliceState) => sliceState.isInitialized,
    },
})

export const appReducer = appSlice.reducer
export const appActions = appSlice.actions
export const { selectAppStatus, selectAppError, selectAppIsInitialized } = appSlice.selectors
