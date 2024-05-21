import {action} from '@storybook/addon-actions';
import type {Meta, StoryObj} from '@storybook/react';
import App from './App';
import {HashRouterStoreDecorator, ReduxStoreProviderDecorator} from '../stories/ReduxStoreProviderDecorator';
import {HashRouter} from 'react-router-dom';
import React from 'react';


const meta = {
    title: 'App Component',
    decorators: [ReduxStoreProviderDecorator, HashRouterStoreDecorator],

} satisfies Meta<typeof App>;


type Story = StoryObj<typeof meta>;
const callback = action('Title was changed')
export const AppBaseExample = () => {
    return<App demo={true}/>
}

export default meta;