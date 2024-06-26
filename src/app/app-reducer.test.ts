import { appActions, appReducer } from "app/app-reducer"
import { RequestStatusType } from "common/types"
type AppStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}
let startState: AppStateType
beforeEach(() => {
    startState = {
        error: null,
        status: "idle",
        isInitialized: false,
    }
})
test("correct error message should be set", () => {
    const endState = appReducer(startState, appActions.setAppErrorAC({ error: "Error message" }))

    expect(endState.error).toBe("Error message")
    expect(endState.status).toBe("idle")
})
test("correct status should be set", () => {
    const endState = appReducer(startState, appActions.setAppStatusAC({ status: "loading" }))

    expect(endState.error).toBe(null)
    expect(endState.status).toBe("loading")
})
