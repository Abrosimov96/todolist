import {AppThunkType} from './store';
import {setAppStatusAC} from './app-reducer';
import {authAPI, LogInDataType} from '../api/auth-api';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';
import {clearTasksAndTodolistsAC} from './todolists-reducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logInAC(state, action: PayloadAction<{isLoggedIn: boolean}>) {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    }
})
export const authReducer = authSlice.reducer
export const {logInAC} = authSlice.actions

export const logInTC = (data: LogInDataType): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.logIn(data)
        .then((res)=> {
            if (res.data.resultCode === 0){
                dispatch(logInAC({isLoggedIn: true}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const logOutTC = (): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI
        .logOut()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(logInAC({isLoggedIn: false}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
                dispatch(clearTasksAndTodolistsAC())
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

