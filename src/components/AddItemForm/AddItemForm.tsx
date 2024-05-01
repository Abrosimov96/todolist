import {Grid, IconButton, TextField} from '@material-ui/core';
import {ControlPoint} from '@material-ui/icons';
import {memo} from 'react';
import {useAddItemForm} from './hooks/useAddItemForm';

type AddItemFormPropsType = {
    addItem: (title: string) => void;
};

export const AddItemForm = memo(({addItem}: AddItemFormPropsType) => {
    console.log('ADD_TASK')
    const {
      newTaskTitle,
      error,
      addNewTask,
      onNewTitleHandler,
      onKeyPressHandler
    } = useAddItemForm(addItem)
    return (
        <Grid container style={{padding: '20px'}}>
            <TextField
                variant="outlined"
                label="Type value"
                type="text"
                value={newTaskTitle}
                onChange={onNewTitleHandler}
                onKeyDown={onKeyPressHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton onClick={addNewTask} color="primary">
                <ControlPoint/>
            </IconButton>
        </Grid>
    );
})
