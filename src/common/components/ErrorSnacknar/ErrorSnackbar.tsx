import React from "react"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert, { AlertProps } from "@mui/material/Alert"
import { useSelector } from "react-redux"
import { AppRootStateType } from "app/store"
import { appActions } from "app/app-reducer"
import { useAppDispatch } from "common/hooks"

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export const ErrorSnackbar = () => {
    const dispatch = useAppDispatch()
    const error = useSelector<AppRootStateType, null | string>((state) => state.app.error)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return
        }
        dispatch(appActions.setAppErrorAC({ error: null }))
    }
    return (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
                {error}
            </Alert>
        </Snackbar>
    )
}
