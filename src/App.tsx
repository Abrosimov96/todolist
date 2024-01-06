import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { TaskType, Todolist } from './Todolist';

type TodolistTpe = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type FilterValuesType = 'all' | 'complited' | 'active';

function App() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistTpe>>([
    { id: todolistId1, title: 'What to learn', filter: 'active' },
    { id: todolistId2, title: 'What to buy', filter: 'complited' },
  ]);

  const [tasksObj, setTasksObj] = useState({
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

  return (
    <div className="App">
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
          />
        );
      })}
    </div>
  );
}

export default App;
