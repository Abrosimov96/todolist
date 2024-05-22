import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import {Grid} from '@mui/material';
import {Todolist} from './Todolist/Todolist';
import React, {useCallback, useEffect} from 'react';
import {addTodolistTC, fetchTodolistsTC, todolistsThunk} from '../../state/todolists-reducer';
import {useAppDispatch, useAppSelector} from '../../state/store';
import {useSelector} from 'react-redux';
import {todolistSelector} from '../../state/selectors/todolistSelector';
import {Navigate} from 'react-router-dom';

type TodolistListProps = {
    demo?: boolean
};
export const TodolistList = ({demo = false}: TodolistListProps) => {

    const dispatch = useAppDispatch();
    const todolists = useSelector(todolistSelector)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        // dispatch(fetchTodolistsTC())
        dispatch(todolistsThunk.getTodolists())
    }, [dispatch, isLoggedIn])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to={'/login'} />
    }

    return (
        <>
            <AddItemForm addItem={addTodolist}/>
            <Grid container spacing={3}>
                {
                    todolists
                        .map(todolist => <Todolist key={todolist.id} todolist={todolist} demo={demo}/>)
                }
            </Grid>
        </>
    )
        ;
};