import {appReducer, RequestStatusType, setAppErrorAC, setAppStatusAC} from './app-reducer';
type AppStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}
let startState: AppStateType
beforeEach(() => {
    startState = {
        error: null,
        status: 'idle',
        isInitialized: false
    }
})
test('correct error message should be set', () => {
    const endState = appReducer(startState, setAppErrorAC({error: 'Error message'}));

    expect(endState.error).toBe('Error message');
    expect(endState.status).toBe('idle');
});
test('correct status should be set', () => {
    const endState = appReducer(startState, setAppStatusAC({status: 'loading'}));

    expect(endState.error).toBe(null);
    expect(endState.status).toBe('loading');
});