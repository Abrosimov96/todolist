import { ChangeEvent, useState } from 'react';

type EditableSpanPropsType = {
  title: string;
  onChange: (newValue: string) => void;
};

export const EditableSpan = ({
  title,
  onChange,
}: EditableSpanPropsType) => {
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
  return editMode ? (
    <input
      value={inputValue}
      onChange={onChangeTitleHandler}
      onBlur={activateViewMode}
      autoFocus
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{title}</span>
  );
};
