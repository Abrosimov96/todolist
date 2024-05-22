import {UnknownAction} from 'redux';
import {todolistsReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';
import {ThunkAction} from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {appReducer} from './app-reducer';
import {authReducer} from './auth-reducer';
import {configureStore, createAsyncThunk} from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        todolists: todolistsReducer,
        tasks: tasksReducer,
        auth: authReducer,
        app: appReducer
    }
})

export type StoreType = typeof store.getState

export type AppRootStateType = ReturnType<StoreType>

export type AppThunkDispatch = typeof store.dispatch
export const useAppDispatch: () => AppThunkDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, UnknownAction>

// @ts-ignore
window.store = store