import {action} from '@storybook/addon-actions';

import type {Meta, StoryObj} from '@storybook/react';
import {Task} from './Task';
import {Provider} from 'react-redux';
import {store} from '../../state/store';
import {ReduxStoreProviderDecorator} from '../../stories/ReduxStoreProviderDecorator';

const meta = {
    title: 'Task Component',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
} satisfies Meta<typeof Task>;


type Story = StoryObj<typeof meta>;
const callback = action('Button was pressed inside the form')
export const TaskBaseExample = () => {
    return <>
        <Task
            task={{id: '1', isDone: true, title: 'CSS'}}
            todolistId={'1'}
        />
        <Task
            task={{id: '2', isDone: false, title: 'HTML'}}
            todolistId={'1'}
        />
    </>
}

export default meta;