import { userReducer } from './user-reducer';

test('user reducer should increment only age', () => {
  const startState = { age: 28, childrenCount: 2, name: 'Dimych' };
  const endState = userReducer(startState, { type: 'INCREMENT-AGE' });

  expect(endState.age).toBe(29);
  expect(endState.childrenCount).toBe(2);
});

test('user reducer should increment only childrenCount', () => {
  const startState = { age: 28, childrenCount: 2, name: 'Dimych' };
  const endState = userReducer(startState, {
    type: 'INCREMENT-CHILDREN-COUNT',
  });

  expect(endState.childrenCount).toBe(3);
  expect(endState.age).toBe(28);
});

test('user reducer should change name of user', () => {
  const startState = { age: 28, childrenCount: 2, name: 'Dimych' };
  const newName = 'Viktor';
  const endState = userReducer(startState, {
    type: 'CHANGE-NAME',
    newName: newName,
  });

  expect(endState.name).toBe(newName);
});
