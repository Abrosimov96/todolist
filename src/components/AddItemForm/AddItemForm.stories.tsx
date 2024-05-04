import {AddItemForm} from './AddItemForm';
import { action } from '@storybook/addon-actions';

import type {Meta, StoryObj} from '@storybook/react';

const meta = {
    title: 'AddItemForm Component',
    component: AddItemForm
} satisfies Meta<typeof AddItemForm>;


type Story = StoryObj<typeof meta>;
const callback = action('Button was pressed inside the form')
export const AddItemFormBaseExample = () => {
    return <AddItemForm addItem={callback}/>
}

export const AddItemFormDisabled = () => {
    return <AddItemForm addItem={callback} disabled/>
}

export default meta;