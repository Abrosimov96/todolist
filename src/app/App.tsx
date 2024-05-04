import {Container, Grid} from '@mui/material';
import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from '../components/AddItemForm/AddItemForm';
import './App.css';
import {Todolist} from '../features/Todolist/Todolist';
import {addTodolistTC, fetchTodolistsTC} from '../state/todolists-reducer';
import {useSelector} from 'react-redux';
import {todolistSelector} from '../state/selectors/todolistSelector';
import {useAppDispatch} from '../state/store';
import {Header} from '../components/Header/Header';
import {ErrorSnackbar} from '../components/ErrorSnacknar/ErrorSnackbar';

type AppProps = {
    demo?: boolean
}

function App({demo = false} : AppProps) {

    const dispatch = useAppDispatch();
    const todolists = useSelector(todolistSelector)

    useEffect(() => {
        if (!demo){
            dispatch(fetchTodolistsTC())
        }
    }, [dispatch, demo]);

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    return (
        <div className="App">
            <Header/>
            <ErrorSnackbar />
            <Container fixed>
                <AddItemForm addItem={addTodolist}/>
                <Grid container spacing={3}>
                    {todolists.map((todolist) => {
                        return (
                            <Todolist
                                key={todolist.id}
                                todolist={todolist}
                                demo={demo}
                            />
                        );
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
