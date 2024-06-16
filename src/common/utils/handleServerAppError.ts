import { BaseResponseType } from "common/types"
import { Dispatch } from "redux"
import { appActions } from "app/app-reducer"

export const handleServerAppError = <D>(
    data: BaseResponseType<D>,
    dispatch: Dispatch,
    isGlobalError: boolean = true,
): void => {
    if (isGlobalError) {
        if (data.messages.length) {
            dispatch(appActions.setAppErrorAC({ error: data.messages[0] }))
        } else {
            dispatch(appActions.setAppErrorAC({ error: "Some error occurred" }))
        }
    }
    // dispatch(appActions.setAppStatus({ status: "failed" }));
}
