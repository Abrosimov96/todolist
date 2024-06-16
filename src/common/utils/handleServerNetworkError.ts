import axios, { AxiosError } from "axios"
import { Dispatch } from "redux"
import { appActions } from "app/app-reducer"

export const handleServerNetworkError = (e: unknown, dispatch: Dispatch) => {
    const err = e as Error | AxiosError<{ error: string }>
    if (axios.isAxiosError(err)) {
        const error = err.message ? err.message : "Some error occurred"
        dispatch(appActions.setAppErrorAC({ error }))
    } else {
        dispatch(appActions.setAppErrorAC({ error: `Native error ${err.message}` }))
    }
    // dispatch(appActions.setAppStatus({ status: "failed" }));
}
