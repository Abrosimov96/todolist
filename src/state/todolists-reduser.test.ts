import {
  addTodolistAC,
  changeFilterTodolistAC,
  changeTitleTodolistAC, FilterValuesType,
  removeTodolistAC,
  todolistsReducer,
  TodolistType,
} from './todolists-reducer';
import { v1 } from 'uuid';

let todolistId1: string
let todolistId2: string
let startState:  Array<TodolistType>
beforeEach(() => {
  let todolistId1 = v1();
  let todolistId2 = v1();
  startState = [
    { id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0 },
    { id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0 },
  ];
})
test('correct todolist should be removed', () => {

  // const endState = todolistsReducer(startState, {
  //   type: 'REMOVE-TODOLIST',
  //   id: todolistId1,
  // });

  const endState = todolistsReducer(startState, removeTodolistAC(todolistId1),);

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
  const newTodolistTitle = 'New Todolist';

  const action = addTodolistAC(newTodolistTitle);

  const endState = todolistsReducer(startState, action);

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTodolistTitle);
  expect(endState[0].filter).toBe('all');
});

test('correct todolist should change its name', () => {
  const newTodolistTitle = 'New Todolist';

  const endState = todolistsReducer(
    startState,
    changeTitleTodolistAC(todolistId2, newTodolistTitle),
  );

  expect(endState[0].title).toBe('What to learn');
  expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should changed', () => {
  const newFilter: FilterValuesType = 'completed';

  const action = changeFilterTodolistAC(todolistId2, newFilter);

  const endState = todolistsReducer(startState, action);

  expect(endState[0].filter).toBe('all');
  expect(endState[1].filter).toBe(newFilter);
});
