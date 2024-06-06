import { authAPI } from "features/auth/api/auth-api"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from "common/utils"
import { RequestStatusType } from "common/types"

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
    },
    extraReducers: (builder) => {
        builder.addCase(initializeApp.fulfilled, (state, action) => {
            state.isInitialized = action.payload.isInitialized
        })
    },
    selectors: {
        selectAppStatus: (sliceState) => sliceState.status,
        selectAppError: (sliceState) => sliceState.error,
        selectAppIsInitialized: (sliceState) => sliceState.isInitialized,
    },
})

export const initializeApp = createAppAsyncThunk<{ isAuthorized: boolean; isInitialized: boolean }, void>(
    `${appSlice.name}/initializeApp`,
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI
        try {
            const res = await authAPI.me()
            if (res.data.resultCode === 0) {
                return { isAuthorized: true, isInitialized: true }
            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue(null)
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
    },
)

export const appReducer = appSlice.reducer
export const appActions = appSlice.actions
export const { selectAppStatus, selectAppError, selectAppIsInitialized } = appSlice.selectors
export const appThunks = { initializeApp }
