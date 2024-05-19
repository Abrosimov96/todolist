import {action} from '@storybook/addon-actions';
import type {Meta, StoryObj} from '@storybook/react';
import App from './App';
import {ReduxStoreProviderDecorator} from '../stories/ReduxStoreProviderDecorator';
import {Outlet, RouterProvider} from 'react-router-dom';
import {router} from '../router/router';

import {reactRouterOutlet, reactRouterParameters, withRouter} from 'storybook-addon-remix-react-router';
import {Provider} from 'react-redux';
import React from 'react';
import {TodolistList} from '../features/TodolistList/TodolistList';


const meta = {
    title: 'App Component',
    decorators: [withRouter, ReduxStoreProviderDecorator],
    parameters: {
        reactRouter: reactRouterParameters({
            routing: {
                path: '/',
                element: <TodolistList/>,
            },
        }),
    },
} satisfies Meta<typeof App>;


type Story = StoryObj<typeof meta>;
const callback = action('Title was changed')
export const AppBaseExample = () => {
    return <App/>
}

export default meta;