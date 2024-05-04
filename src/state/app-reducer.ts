export const appReducer = (state: AppInitialStateType = initialState, action: AppActionsType): AppInitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return { ...state, status: action.status }
        case 'APP/SET-ERROR':
            return { ...state, error: action.error }
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({ type: 'APP/SET-STATUS', status }) as const
export const setAppErrorAC = (error: string | null) => ({ type: 'APP/SET-ERROR', error }) as const

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type AppActionsType = SetAppStatusActionType | SetAppErrorActionType

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
const initialState: AppInitialStateType = {
    status: 'idle',
    error: null,
}
export type AppInitialStateType = {
    status: RequestStatusType
    error: string | null
}