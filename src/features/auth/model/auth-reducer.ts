import { authAPI } from "features/auth/api/auth-api"
import { createSlice } from "@reduxjs/toolkit"
import { appActions, appThunks } from "app/app-reducer"
import { clearTasksAndTodolists } from "common/actions/common.actions"
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from "common/utils"
import { LogInDataType } from "features/auth/api/auth-api.types"
import { ResultCode } from "common/enums"

const initialState = {
    isAuthorized: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(logIn.fulfilled, (state, action) => {
                state.isAuthorized = action.payload.isAuthorized
            })
            .addCase(logOut.fulfilled, (state, action) => {
                state.isAuthorized = action.payload.isAuthorized
            })
            .addCase(appThunks.initializeApp.fulfilled, (state, action) => {
                state.isAuthorized = action.payload.isAuthorized
            })
    },
    selectors: {
        selectAuthIsAuthorized: (sliceState) => sliceState.isAuthorized,
    },
})

export const logIn = createAppAsyncThunk<{ isAuthorized: boolean }, LogInDataType>(
    `${authSlice.name}/logIn`,
    async (data, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI
        try {
            dispatch(appActions.setAppStatusAC({ status: "loading" }))
            const res = await authAPI.logIn(data)
            if (res.data.resultCode === ResultCode.success) {
                dispatch(appActions.setAppStatusAC({ status: "succeeded" }))
                return { isAuthorized: true }
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

export const logOut = createAppAsyncThunk<{ isAuthorized: boolean }, void>(
    `${authSlice.name}/logOut`,
    async (_, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI
        try {
            dispatch(appActions.setAppStatusAC({ status: "loading" }))
            const res = await authAPI.logOut()
            if (res.data.resultCode === ResultCode.success) {
                dispatch(appActions.setAppStatusAC({ status: "succeeded" }))
                dispatch(clearTasksAndTodolists())
                return { isAuthorized: false }
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
export const authReducer = authSlice.reducer
export const { selectAuthIsAuthorized } = authSlice.selectors
export const authThunks = { logIn, logOut }
