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
      <input
        type="text"
        value={newTaskTitle}
        onChange={onNewTitleHandler}
        onKeyDown={onKeyPressHadler}
        className={error ? 'error' : ''}
      />
      <button onClick={addNewTask}>+</button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}