import {AppInitialStateType, appReducer, setAppErrorAC, setAppStatusAC} from './app-reducer';


let startState: AppInitialStateType
beforeEach(() => {
    startState = {
        error: null,
        status: 'idle'
    }
})
test('correct error message should be set', () => {
    const endState = appReducer(startState, setAppErrorAC('Error message'));

    expect(endState.error).toBe('Error message');
    expect(endState.status).toBe('idle');
});
test('correct status should be set', () => {
    const endState = appReducer(startState, setAppStatusAC('loading'));

    expect(endState.error).toBe(null);
    expect(endState.status).toBe('loading');
});