import {TextField} from '@mui/material';
import {memo} from 'react';
import {useEditableSpan} from './hooks/useEditableSpan';

type EditableSpanPropsType = {
    title: string;
    onChange: (newValue: string) => void;
    disabled?: boolean
};

export const EditableSpan = memo(({title, onChange, disabled}: EditableSpanPropsType) => {

    const {
        inputValue,
        editMode,
        onChangeTitleHandler,
        activateEditMode,
        activateViewMode
    } = useEditableSpan(title, onChange)

    return editMode && !disabled ? (
        <TextField
            value={inputValue}
            onChange={onChangeTitleHandler}
            onBlur={activateViewMode}
            autoFocus
        />
    ) : (
        <span onDoubleClick={activateEditMode}>{title}</span>
    );
})
