import { CircularProgress, Container } from "@mui/material"
import React, { useEffect } from "react"
import "./App.css"
import { Header } from "common/components/Header/Header"
import { ErrorSnackbar } from "common/components/ErrorSnacknar/ErrorSnackbar"
import { Outlet } from "react-router-dom"
import { selectAppIsInitialized } from "app/app-reducer"
import { useSelector } from "react-redux"
import { useActions } from "common/hooks"
import { authThunks } from "features/auth/model/auth-reducer"

type AppProps = {
    demo?: boolean
}

function App({ demo = false }: AppProps) {
    const isInitialized = useSelector(selectAppIsInitialized)
    const { initializeApp } = useActions(authThunks)

    useEffect(() => {
        initializeApp()
    }, [])

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
