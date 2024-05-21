import {tasksReducer, TasksStateType} from './tasks-reducer';
import { addTodolistAC, todolistsReducer, TodolistType } from './todolists-reducer';

test('ids should be equal', () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodolistType> = [];

  const todolist = { id: 'todolistId3', title: 'What to learn', addedDate: '', order: 0 }

  const action = addTodolistAC({todolist},);

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolist.id);
  expect(idFromTodolists).toBe(action.payload.todolist.id);
});
