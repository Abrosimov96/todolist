import {AnyAction, applyMiddleware, combineReducers, compose, Dispatch, legacy_createStore} from 'redux';
import {TodolistActionsType, todolistsReducer} from './todolists-reducer';
import {TaskActionsType, tasksReducer} from './tasks-reducer';
import thunk, {ThunkDispatch} from 'redux-thunk'
import {useDispatch} from 'react-redux';
import {AppActionsType, appReducer} from './app-reducer';

export const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>
// eslint-disable-next-line
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// @ts-ignore
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();


export type RootDispatchActionType = Dispatch<AppActionsType | TaskActionsType | TodolistActionsType>
// @ts-ignore
window.store = store