import { IconButton, TextField } from '@material-ui/core';
import { ControlPoint } from '@material-ui/icons';
import { ChangeEvent, KeyboardEvent, useState } from 'react';

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

export function AddItemForm({ addItem }: AddItemFormPropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState('');

  const addNewTask = () => {
    if (newTaskTitle.trim() === '') {
      setNewTaskTitle('');
      setError('Field is required!');
      return;
    }
    addItem(newTaskTitle);
    setNewTaskTitle('');
  };

  const onNewTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.target.value);
  };

  const onKeyPressHadler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError('');
    e.code === 'Enter' && addNewTask();
  };

  return (
    <div>
      <TextField
        variant="outlined"
        label="Type value"
        type="text"
        value={newTaskTitle}
        onChange={onNewTitleHandler}
        onKeyDown={onKeyPressHadler}
        error={!!error}
        helperText={error}
      />
      <IconButton onClick={addNewTask} color="primary">
        <ControlPoint />
      </IconButton>
    </div>
  );
}
