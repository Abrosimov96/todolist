import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography,} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from '../components/AddItemForm/AddItemForm';
import './App.css';
import {Todolist} from '../features/Todolist/Todolist';
import {addTodolistTC, fetchTodolistsTC} from '../state/todolists-reducer';
import {useSelector} from 'react-redux';
import {todolistSelector} from '../state/selectors/todolistSelector';
import {useAppDispatch} from '../state/store';

function App() {

    const dispatch = useAppDispatch();
    const todolists = useSelector(todolistSelector)

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [dispatch]);

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

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
                <AddItemForm addItem={addTodolist}/>
                <Grid container spacing={3}>
                    {todolists.map((todolist) => {
                        return (
                            <Todolist
                                key={todolist.id}
                                todolist={todolist}
                            />
                        );
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
