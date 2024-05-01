import type {Meta} from '@storybook/react';
import {Task} from './Task';
import {ReduxStoreProviderDecorator} from '../../stories/ReduxStoreProviderDecorator';
import {TaskPriorities, TaskStatuses} from '../../api/task-api';

const meta = {
    title: 'Task Component',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
} satisfies Meta<typeof Task>;

export const TaskBaseExample = () => {
    return <>
        <Task
            task={{ id: '3', title: 'React', status: TaskStatuses.New, priority: TaskPriorities.Low, description: '', order: 0, deadline: '', startDate: '', addedDate: '', todoListId: 'todolistId1'}}
            todolistId={'1'}
        />
        <Task
            task={{ id: '3', title: 'React', status: TaskStatuses.Completed, priority: TaskPriorities.Low, description: '', order: 0, deadline: '', startDate: '', addedDate: '', todoListId: 'todolistId1'  }}
            todolistId={'1'}
        />
    </>
}

export default meta;