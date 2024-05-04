import {action} from '@storybook/addon-actions';

import type {Meta, StoryObj} from '@storybook/react';
import App from './App';
import {ReduxStoreProviderDecorator} from '../stories/ReduxStoreProviderDecorator';

const meta = {
    title: 'App Component',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} satisfies Meta<typeof App>;


type Story = StoryObj<typeof meta>;
const callback = action('Title was changed')
export const AppBaseExample = () => {
    return <App demo={true} />
}

export default meta;