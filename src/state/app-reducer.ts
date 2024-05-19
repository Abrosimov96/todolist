import {authAPI} from '../api/auth-api';
import {logInAC} from './auth-reducer';
import {AppThunkType} from './store';

export const appReducer = (state: AppInitialStateType = initialState, action: AppActionsType): AppInitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/INITIALIZE':
            return {...state, isInitialized: action.init}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status}) as const
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error}) as const
export const setAppInitializedAC = (init: boolean) => ({type: 'APP/INITIALIZE', init}) as const

export const initializeAppTC = (): AppThunkType => dispatch => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(logInAC(true))
        }
        dispatch(setAppInitializedAC(true))
    })
}

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppInitializedActionType = ReturnType<typeof setAppInitializedAC>
export type AppActionsType = SetAppStatusActionType | SetAppErrorActionType | SetAppInitializedActionType

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
const initialState: AppInitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}
export type AppInitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}