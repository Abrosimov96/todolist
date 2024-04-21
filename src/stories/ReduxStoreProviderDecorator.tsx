import {Provider} from 'react-redux';
import {AppStoreType} from '../state/store';
import {combineReducers, legacy_createStore} from 'redux';
import {tasksReducer} from '../state/tasks-reducer';
import {todolistsReducer} from '../state/todolists-reducer';
import {v1} from 'uuid';


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialState: AppStoreType = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all'},
    ],
    tasks: {
        ['todolistId1']:
            [
                {id: v1(), title: 'CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'React', isDone: false},
                {id: v1(), title: 'TypeScript', isDone: false},
            ],
        ['todolistId2']:
            [
                {id: v1(), title: 'Book', isDone: true},
                {id: v1(), title: 'Milk', isDone: false},
            ],
    }
}

// @ts-ignore
export const storyBookStore = legacy_createStore(rootReducer, initialState)

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>
}