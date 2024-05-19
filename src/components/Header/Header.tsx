import {AppBar, Button, IconButton, LinearProgress, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import React from 'react';
import {useAppDispatch, useAppSelector} from '../../state/store';
import {logOutTC} from '../../state/auth-reducer';


export const Header = () => {
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const onLogOut = () => {
        dispatch(logOutTC())
    }
    return (
        <AppBar position="static">
            <Toolbar style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <Menu/>
                </IconButton>
                <Typography variant="h6">Todolist</Typography>
                {isLoggedIn && <Button color="inherit" onClick={onLogOut}>Log out</Button>}
            </Toolbar>
            {status === 'loading' && <LinearProgress/>}
        </AppBar>
    );
};