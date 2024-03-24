import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography,} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import React, {useReducer} from 'react';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemFor';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    removeTodolistAC,
    todolistsReducer
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';

export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};

export type TasksStateType = {
    [key: string]: Array<TaskType>;
};

export type FilterValuesType = 'all' | 'complited' | 'active';

const todolistId1 = v1();
const todolistId2 = v1();
const mockTodolist: TodolistType[] = [
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to buy', filter: 'all'},
]
const mockTasks: TasksStateType = {
    [todolistId1]: [
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'TypeScript', isDone: false},
    ],
    [todolistId2]: [
        {id: v1(), title: 'Book', isDone: true},
        {id: v1(), title: 'Milk', isDone: false},
    ],
}

function App() {

    const [todolists, dispatchTodolists] = useReducer(todolistsReducer, mockTodolist);

    const [tasksObj, dispatchTasksObj] = useReducer(tasksReducer, mockTasks);

    const removeTask = (id: string, todolistId: string) => {
        dispatchTasksObj(removeTaskAC(id, todolistId))
    };

    const addTask = (title: string, todolistId: string) => {
        dispatchTasksObj(addTaskAC(title, todolistId))
    };

    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        dispatchTodolists(changeFilterTodolistAC(todolistId, filter))
    };

    const changeStatus = (
        id: string,
        isDone: boolean,
        todolistId: string,
    ) => {
        dispatchTasksObj(changeTaskStatusAC(id, isDone, todolistId))
    };

    const onRemoveList = (todolistId: string) => {
        dispatchTodolists(removeTodolistAC(todolistId))
        dispatchTasksObj(removeTodolistAC(todolistId))
    };

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatchTasksObj(action)
        dispatchTodolists(action)
    };

    const changeTaskTitleHandler = (
        newTitle: string,
        taskId: string,
        todolistId: string,
    ) => {
        dispatchTasksObj(changeTaskTitleAC(taskId, newTitle, todolistId))
    };

    const changeTodolistTitleHandler = (
        newTitle: string,
        todolistId: string,
    ) => {
        dispatchTodolists(changeTitleTodolistAC(todolistId, newTitle))
    };

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">News</Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((todolist) => {
                        let filteredTasks = tasksObj[todolist.id];

                        if (todolist.filter === 'complited') {
                            filteredTasks = filteredTasks.filter(
                                (task) => task.isDone,
                            );
                        }
                        if (todolist.filter === 'active') {
                            filteredTasks = filteredTasks.filter(
                                (task) => !task.isDone,
                            );
                        }
                        return (
                            <Grid item key={todolist.id}>
                                <Paper style={{padding: '10px'}} elevation={3}>
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
