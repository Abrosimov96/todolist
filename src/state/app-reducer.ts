import {authAPI} from '../api/auth-api';
import {logInAC} from './auth-reducer';
import {AppThunkType} from './store';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
    status: 'idle',
    error: null as null | string,
    isInitialized: false
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{status: RequestStatusType}>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{error: null | string}>) {
            state.error = action.payload.error
        },
        setAppInitializedAC(state, action: PayloadAction<{isInitialized: boolean}>) {
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const appReducer = appSlice.reducer
export const {
    setAppStatusAC,
    setAppErrorAC,
    setAppInitializedAC
} = appSlice.actions

export const initializeAppTC = (): AppThunkType => dispatch => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(logInAC({isLoggedIn: true}))
        }
        dispatch(setAppInitializedAC({isInitialized: true}))
    })
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'