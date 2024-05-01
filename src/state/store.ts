import {AnyAction, applyMiddleware, combineReducers, compose, legacy_createStore} from 'redux';
import {todolistsReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';
import thunk, {ThunkDispatch} from 'redux-thunk'
import {useDispatch} from 'react-redux';

export const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>
// eslint-disable-next-line
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// @ts-ignore
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();

// @ts-ignore
window.store = store