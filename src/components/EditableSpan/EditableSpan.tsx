import {TextField} from '@material-ui/core';
import {memo} from 'react';
import {useEditableSpan} from './hooks/useEditableSpan';

type EditableSpanPropsType = {
    title: string;
    onChange: (newValue: string) => void;
};

export const EditableSpan = memo(({title, onChange}: EditableSpanPropsType) => {

    const {
        inputValue,
        editMode,
        onChangeTitleHandler,
        activateEditMode,
        activateViewMode
    } = useEditableSpan(title, onChange)

    return editMode ? (
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
