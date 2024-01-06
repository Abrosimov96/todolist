import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { TaskType, Todolist } from './Todolist';

export type FilterValuesType = 'all' | 'complited' | 'active';

function App() {
  const initTasks = [
    { id: v1(), title: 'CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'React', isDone: false },
    { id: v1(), title: 'TypeScript', isDone: false },
  ];

  const [tasks, setTasks] = useState<TaskType[]>(initTasks);
  const [filter, setFilter] = useState<FilterValuesType>('all');

  const removeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const addTask = (title: string) => {
    let newTask = { id: v1(), title, isDone: false };
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  };

  const changeFilter = (filter: FilterValuesType) => {
    setFilter(filter);
  };

  let filteredTasks = tasks;

  if (filter === 'complited') {
    filteredTasks = tasks.filter((task) => task.isDone === true);
  }
  if (filter === 'active') {
    filteredTasks = tasks.filter((task) => task.isDone === false);
  }

  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={filteredTasks}
        addTask={addTask}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
