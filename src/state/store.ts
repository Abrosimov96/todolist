import {AnyAction, applyMiddleware, combineReducers, compose, Dispatch, legacy_createStore} from 'redux';
import {TodolistActionsType, todolistsReducer} from './todolists-reducer';
import {TaskActionsType, tasksReducer} from './tasks-reducer';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppActionsType, appReducer} from './app-reducer';
import {AuthActionType, authReducer} from './auth-reducer';

export const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    auth: authReducer,
    app: appReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>
// eslint-disable-next-line
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// @ts-ignore
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionType>

type AppActionType = AppActionsType | TaskActionsType | TodolistActionsType | AuthActionType

export type RootDispatchActionType = Dispatch<AppActionType>
// @ts-ignore
window.store = store