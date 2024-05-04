import {AppBar, Button, IconButton, LinearProgress, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import React from 'react';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../state/store';
import {RequestStatusType} from '../../state/app-reducer';


export const Header = () => {
    const status = useSelector<AppRootStateType, RequestStatusType>(state=> state.app.status)
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <Menu/>
                </IconButton>
                <Typography variant="h6">News</Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
            {status === 'loading' && <LinearProgress />}
        </AppBar>
    );
};