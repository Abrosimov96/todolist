import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import React, { useState } from 'react';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemFor';
import './App.css';
import { TaskType, Todolist } from './Todolist';

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

type TasksStateType = {
  [key: string]: Array<TaskType>;
};

export type FilterValuesType = 'all' | 'complited' | 'active';

function App() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ]);

  const [tasksObj, setTasksObj] = useState<TasksStateType>({
    [todolistId1]: [
      { id: v1(), title: 'CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'React', isDone: false },
      { id: v1(), title: 'TypeScript', isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: 'Book', isDone: true },
      { id: v1(), title: 'Milk', isDone: false },
    ],
  });

  const removeTask = (id: string, todolistId: string) => {
    let tasks = tasksObj[todolistId];
    let newTasks = tasks.filter((task) => task.id !== id);
    tasksObj[todolistId] = newTasks;
    setTasksObj({ ...tasksObj });
  };

  const addTask = (title: string, todolistId: string) => {
    let newTask = { id: v1(), title, isDone: false };
    let tasks = tasksObj[todolistId];
    let newTasks = [newTask, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasksObj({ ...tasksObj });
  };

  const changeFilter = (
    filter: FilterValuesType,
    todolistId: string,
  ) => {
    let todolist = todolists.find((tl) => tl.id === todolistId);
    if (todolist) {
      todolist.filter = filter;
      setTodolists([...todolists]);
    }
  };

  const changeStatus = (
    id: string,
    isDone: boolean,
    todolistId: string,
  ) => {
    let tasks = tasksObj[todolistId];

    const task = tasks.find((task) => task.id === id);
    if (task) {
      task.isDone = isDone;
      setTasksObj({ ...tasksObj });
    }
  };

  const onRemoveList = (todolistId: string) => {
    let filteredLists = todolists.filter(
      (tl) => tl.id !== todolistId,
    );
    setTodolists(filteredLists);
    delete tasksObj[todolistId];
    setTasksObj({ ...tasksObj });
  };

  const addTodolist = (title: string) => {
    let newTodolist: TodolistType = {
      id: v1(),
      title,
      filter: 'all',
    };
    setTodolists([newTodolist, ...todolists]);
    setTasksObj({ ...tasksObj, [newTodolist.id]: [] });
  };

  const changeTaskTitleHandler = (
    newTitle: string,
    taskId: string,
    todolistId: string,
  ) => {
    let tasks = tasksObj[todolistId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.title = newTitle;
      setTasksObj({ ...tasksObj });
    }
  };

  const changeTodolistTitleHandler = (
    newTitle: string,
    todolistId: string,
  ) => {
    let todolist = todolists.find((tl) => tl.id === todolistId);
    if (todolist) {
      todolist.title = newTitle;
    }
    setTodolists([...todolists]);
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: '20px' }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          {todolists.map((todolist) => {
            let filteredTasks = tasksObj[todolist.id];

            if (todolist.filter === 'complited') {
              filteredTasks = filteredTasks.filter(
                (task) => task.isDone === true,
              );
            }
            if (todolist.filter === 'active') {
              filteredTasks = filteredTasks.filter(
                (task) => task.isDone === false,
              );
            }
            return (
              <Grid item>
                <Paper style={{ padding: '10px' }} elevation={3}>
                  <Todolist
                    key={todolist.id}
                    id={todolist.id}
                    removeList={onRemoveList}
                    title={todolist.title}
                    tasks={filteredTasks}
                    addTask={addTask}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    changeTaskStatus={changeStatus}
                    filter={todolist.filter}
                    changeTaskTitle={changeTaskTitleHandler}
                    changeTodolistTitle={changeTodolistTitleHandler}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
