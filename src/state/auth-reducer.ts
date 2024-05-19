import {AppThunkType} from './store';
import {setAppInitializedAC, setAppStatusAC} from './app-reducer';
import {authAPI, LogInDataType} from '../api/auth-api';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';
import axios from 'axios';

const initialState: InitialStateType = {
    isLoggedIn: false
}

type InitialStateType = {
    isLoggedIn: boolean
}

export const authReducer = (state = initialState, action: AuthActionType): InitialStateType => {
    switch (action.type) {
        case 'auth/LOG-IN':
            return {
                ...state,
                isLoggedIn: action.isLoggedIn
            }
        default:
            return state
    }
}

type LogInACType = ReturnType<typeof logInAC>
export const logInAC = (isLoggedIn: boolean) => ({type: 'auth/LOG-IN' as const, isLoggedIn })

export const logInTC = (data: LogInDataType): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logIn(data)
        .then((res)=> {
            if (res.data.resultCode === 0){
                dispatch(logInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const meTC = (): AppThunkType => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await authAPI.me()
        if (res.data.resultCode === 0 ) {
            dispatch(logInAC(true))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        if (axios.isAxiosError(e)) handleServerNetworkError(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
        dispatch(setAppInitializedAC(true))
    }
}
export const logOutTC = (): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI
        .logOut()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(logInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}


export type AuthActionType = LogInACType
