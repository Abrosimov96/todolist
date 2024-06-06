import { AppThunkDispatch } from "app/store"
import axios from "axios"
import { appActions } from "app/app-reducer"

export const handleServerNetworkError = (err: unknown, dispatch: AppThunkDispatch): void => {
    let errorMessage = "Some error occurred"

    if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err?.message || errorMessage
    } else if (err instanceof Error) {
        errorMessage = `Native error: ${err.message}`
    } else {
        errorMessage = JSON.stringify(err)
    }

    dispatch(appActions.setAppErrorAC({ error: errorMessage }))
    dispatch(appActions.setAppStatusAC({ status: "failed" }))
}
