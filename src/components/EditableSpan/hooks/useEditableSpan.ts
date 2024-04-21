import {ChangeEvent, useState} from 'react';

export const useEditableSpan = (title: string, onChange:(newValue: string) => void) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [editMode, setEditMode] = useState<boolean>(false);

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const activateEditMode = () => {
        setEditMode(true);
        setInputValue(title);
    };
    const activateViewMode = () => {
        setEditMode(false);
        onChange(inputValue);
    };

    return {
        inputValue,
        editMode,
        onChangeTitleHandler,
        activateEditMode,
        activateViewMode
    }
}