import {setAppErrorAC, setAppStatusAC} from '../state/app-reducer';
import {ResponseType} from '../api/todolists-api';
import {RootDispatchActionType} from '../state/store';

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: RootDispatchActionType) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Something went wrong :('))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: RootDispatchActionType) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'Something went wrong :('))
    dispatch(setAppStatusAC('failed'))
}