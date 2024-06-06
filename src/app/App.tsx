import { CircularProgress, Container } from "@mui/material"
import React, { useEffect } from "react"
import "./App.css"
import { Header } from "common/components/Header/Header"
import { ErrorSnackbar } from "common/components/ErrorSnacknar/ErrorSnackbar"
import { Outlet } from "react-router-dom"
import { appThunks, selectAppIsInitialized } from "app/app-reducer"
import { useSelector } from "react-redux"
import { useAppDispatch } from "common/hooks"

type AppProps = {
    demo?: boolean
}

function App({ demo = false }: AppProps) {
    const isInitialized = useSelector(selectAppIsInitialized)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(appThunks.initializeApp())
    }, [dispatch])

    if (!isInitialized) {
        return (
            <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
                <CircularProgress />
            </div>
        )
    }

    return (
        <div className="App">
            <Header />
            <ErrorSnackbar />
            <Container fixed>
                <Outlet />
            </Container>
        </div>
    )
}

export default App
