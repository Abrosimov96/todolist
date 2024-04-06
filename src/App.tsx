import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography,} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import React from 'react';
import {AddItemForm} from './AddItemFor';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {addTodolistAC} from './state/todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from './state/store';

export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};

export type TasksStateType = {
    [key: string]: Array<TaskType>;
};

export type FilterValuesType = 'all' | 'completed' | 'active';

function App() {

    const dispatch = useDispatch()
    const todolists = useSelector<AppStoreType, TodolistType[]>(store => store.todolists)

    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    };


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">News</Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((todolist) => {
                        return (
                            <Grid item key={todolist.id}>
                                <Paper style={{padding: '10px'}} elevation={3}>
                                    <Todolist
                                        key={todolist.id}
                                        id={todolist.id}
                                        title={todolist.title}
                                        filter={todolist.filter}
                                    />
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
