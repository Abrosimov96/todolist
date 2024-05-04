import {Provider} from 'react-redux';
import {AppRootStateType} from '../state/store';
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {tasksReducer} from '../state/tasks-reducer';
import {todolistsReducer} from '../state/todolists-reducer';
import {v1} from 'uuid';
import {TaskPriorities, TaskStatuses} from '../api/task-api';
import {appReducer} from '../state/app-reducer';
import thunk from 'redux-thunk';


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})

const initialState: AppRootStateType = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'loading'},
    ],
    tasks: {
        todolistId1:
            [
                {id: v1(), title: 'CSS', status: TaskStatuses.Completed, todoListId: 'todolistId1', startDate: '', addedDate: '', deadline: '', order: 0, description: '', priority: TaskPriorities.High},
                {id: v1(), title: 'JS', status: TaskStatuses.Completed, todoListId: 'todolistId1', startDate: '', addedDate: '', deadline: '', order: 0, description: '', priority: TaskPriorities.High},
                {id: v1(), title: 'React', status: TaskStatuses.Completed, todoListId: 'todolistId1', startDate: '', addedDate: '', deadline: '', order: 0, description: '', priority: TaskPriorities.High},
                {id: v1(), title: 'TypeScript', status: TaskStatuses.Completed, todoListId: 'todolistId1', startDate: '', addedDate: '', deadline: '', order: 0, description: '', priority: TaskPriorities.High},
            ],
        todolistId2:
            [
                {id: v1(), title: 'Book', status: TaskStatuses.Completed, todoListId: 'todolistId2', startDate: '', addedDate: '', deadline: '', order: 0, description: '', priority: TaskPriorities.High},
                 {id: v1(), title: 'Milk', status: TaskStatuses.Completed, todoListId: 'todolistId2', startDate: '', addedDate: '', deadline: '', order: 0, description: '', priority: TaskPriorities.High},
            ],
    },
    app: {
        status: 'idle',
        error: null
    }
}

// @ts-ignore
export const storyBookStore = legacy_createStore(rootReducer, initialState, applyMiddleware(thunk))

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>
}