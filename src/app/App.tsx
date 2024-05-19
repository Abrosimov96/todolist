import {CircularProgress, Container} from '@mui/material';
import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from '../state/store';
import {Header} from '../components/Header/Header';
import {ErrorSnackbar} from '../components/ErrorSnacknar/ErrorSnackbar';
import {Outlet} from 'react-router-dom';
import {initializeAppTC} from '../state/app-reducer';

type AppProps = {
    demo?: boolean
}

function App({demo = false} : AppProps) {

    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    if (!isInitialized) {
        return (
            <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
                <CircularProgress />
            </div>
        )
    }

    return (
        <div className="App">
            <Header/>
            <ErrorSnackbar />
            <Container fixed>
                <Outlet />
            </Container>
        </div>
    );
}

export default App;
