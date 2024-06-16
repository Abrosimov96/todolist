import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk"
import { appActions } from "app/app-reducer"
import { AppDispatch, AppRootStateType } from "app/store"
import { BaseResponseType } from "../types"
import { handleServerNetworkError } from "./"

export const thunkTryCatch = async <T>(
    thunkAPI: BaseThunkAPI<AppRootStateType, unknown, AppDispatch, null | BaseResponseType>,
    logic: () => Promise<T>,
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
        dispatch(appActions.setAppStatusAC({ status: "loading" }))
        return await logic()
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    } finally {
        dispatch(appActions.setAppStatusAC({ status: "idle" }))
    }
}
