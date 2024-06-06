import { AppBar, Button, IconButton, LinearProgress, Toolbar, Typography } from "@mui/material"
import { Menu } from "@mui/icons-material"
import { authThunks, selectAuthIsAuthorized } from "features/auth/model/auth-reducer"
import { selectAppStatus } from "app/app-reducer"
import { useSelector } from "react-redux"
import { useAppDispatch } from "common/hooks"

export const Header = () => {
    const dispatch = useAppDispatch()
    const status = useSelector(selectAppStatus)
    const isAuthorized = useSelector(selectAuthIsAuthorized)

    const onLogOut = () => {
        dispatch(authThunks.logOut())
    }
    return (
        <AppBar position="static">
            <Toolbar style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <Menu />
                </IconButton>
                <Typography variant="h6">Todolist</Typography>
                {isAuthorized && (
                    <Button color="inherit" onClick={onLogOut}>
                        Log out
                    </Button>
                )}
            </Toolbar>
            {status === "loading" && <LinearProgress />}
        </AppBar>
    )
}
