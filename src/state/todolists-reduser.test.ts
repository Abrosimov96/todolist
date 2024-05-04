import {
  addTodolistAC,
  changeTodolistFilterAC, changeTodolistStatusAC,
  changeTodolistTitleAC,
  FilterValuesType,
  removeTodolistAC,
  setTodolistsAC,
  todolistsReducer,
  TodolistType,
} from './todolists-reducer';
import {RequestStatusType} from './app-reducer';


let startState:  Array<TodolistType>
beforeEach(() => {
  startState = [
    { id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle' },
    { id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle' },
  ];
})
test('correct todolist should be removed', () => {

  const endState = todolistsReducer(startState, removeTodolistAC('todolistId1'));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe('todolistId2');
});

test('correct todolist should be added', () => {
  const newTodolistTitle = { id: 'todolistId1', title: 'New Todolist', filter: 'all', addedDate: '', order: 0 };

  const action = addTodolistAC(newTodolistTitle);

  const endState = todolistsReducer(startState, action);

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTodolistTitle.title);
  expect(endState[0].filter).toBe('all');
});

test('correct todolist should change its name', () => {
  const newTodolistTitle = 'New Todolist';

  const endState = todolistsReducer(
    startState,
    changeTodolistTitleAC('todolistId2', newTodolistTitle),
  );

  expect(endState[0].title).toBe('What to learn');
  expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should changed', () => {
  const newFilter: FilterValuesType = 'completed';

  const action = changeTodolistFilterAC('todolistId2', newFilter);

  const endState = todolistsReducer(startState, action);

  expect(endState[0].filter).toBe('all');
  expect(endState[1].filter).toBe(newFilter);
});

test('todolists should be set to the state', () => {
  const action = setTodolistsAC(startState);

  const endState = todolistsReducer([], action);

  expect(endState.length).toBe(2);
});

test('correct status of todolist should changed', () => {
  const newStatus: RequestStatusType = 'loading';

  const action = changeTodolistStatusAC('todolistId2', newStatus);

  const endState = todolistsReducer(startState, action);

  expect(endState[0].entityStatus).toBe('idle');
  expect(endState[1].entityStatus).toBe(newStatus);
});
