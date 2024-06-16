import { authAPI } from "features/auth/api/auth-api"
import { createSlice, isFulfilled, PayloadAction } from "@reduxjs/toolkit"
import { appActions } from "app/app-reducer"
import { clearTasksAndTodolists } from "common/actions/common.actions"
import { createAppAsyncThunk } from "common/utils"
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
        builder.addMatcher(
            // isAnyOf(authThunks.login.fulfilled, authThunks.logout.fulfilled, authThunks.initializeApp.fulfilled),
            isFulfilled(authThunks.logIn, authThunks.logOut, authThunks.initializeApp),
            (state, action: PayloadAction<{ isAuthorized: boolean }>) => {
                state.isAuthorized = action.payload.isAuthorized
            },
        )
    },
    selectors: {
        selectAuthIsAuthorized: (sliceState) => sliceState.isAuthorized,
    },
})

const initializeApp = createAppAsyncThunk<{ isAuthorized: boolean }, void>(
    `${authSlice.name}/initializeApp`,
    async (_, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI
        const res = await authAPI.me()
        dispatch(appActions.setAppInitialized({ isInitialized: true }))
        if (res.data.resultCode === ResultCode.success) {
            return { isAuthorized: true }
        } else {
            return rejectWithValue(res.data)
        }
    },
)

export const logIn = createAppAsyncThunk<{ isAuthorized: boolean }, LogInDataType>(
    `${authSlice.name}/logIn`,
    async (data, thunkAPI) => {
        const { rejectWithValue } = thunkAPI
        const res = await authAPI.logIn(data)

        if (res.data.resultCode === ResultCode.success) {
            return { isAuthorized: true }
        } else {
            return rejectWithValue(res.data)
        }
    },
)

export const logOut = createAppAsyncThunk<{ isAuthorized: boolean }, void>(
    `${authSlice.name}/logOut`,
    async (_, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI
        const res = await authAPI.logOut()
        if (res.data.resultCode === ResultCode.success) {
            dispatch(clearTasksAndTodolists())
            return { isAuthorized: false }
        } else {
            return rejectWithValue(res.data)
        }
    },
)
export const authReducer = authSlice.reducer
export const { selectAuthIsAuthorized } = authSlice.selectors
export const authThunks = { logIn, logOut, initializeApp }
