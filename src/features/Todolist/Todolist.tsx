import {Button, Grid, IconButton, Paper,} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {memo, useCallback, useEffect, useMemo} from 'react';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../components/EditableSpan/EditableSpan';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from '../../state/store';
import {addTaskTC, fetchTasksTC} from '../../state/tasks-reducer';
import {
    changeFilterTodolistAC,
    changeTodolistTitleTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistType
} from '../../state/todolists-reducer';
import {Task} from '../Tasks/Task';
import {TaskStatuses, TaskType} from '../../api/task-api';

type PropsType = {
    todolist: TodolistType
};

export const Todolist = memo(({todolist}: PropsType) => {
    console.log('TODOLIST')
    const {id, title, filter} = todolist

    const dispatch = useAppDispatch()
    const tasks = useSelector<AppRootStateType, TaskType[]>(store => store.tasks[id])

    useEffect(() => {
        dispatch(fetchTasksTC(id))
    }, [dispatch, id]);


    const addTask = useCallback((title: string) => {
        dispatch(addTaskTC(id, title))
    }, [dispatch, id]);

    const onClickFilter = useCallback((filter: FilterValuesType) => {
        dispatch(changeFilterTodolistAC(id, filter));
    }, [dispatch, id]);

    const removeTodolist = useCallback(() => {
        dispatch(removeTodolistTC(id))
    }, [dispatch, id]);

    const onChangeTodolistTitleHandler = useCallback((newTitle: string) => {
        dispatch(changeTodolistTitleTC(id, newTitle));
    }, [dispatch, id]);

    let filteredTasks: TaskType[];

    filteredTasks = useMemo(() => {
        if (filter === 'completed') {
            return tasks.filter((task) => task.status === TaskStatuses.Completed);
        }
        if (filter === 'active') {
            return tasks.filter((task) => task.status === TaskStatuses.New);
        }
        return tasks
    }, [tasks, filter])

    return (
        <Grid item>
            <Paper style={{padding: '10px'}} elevation={3}>
                <div>
                    <h3 style={{textAlign: 'center'}}>
                        <EditableSpan
                            title={title}
                            onChange={onChangeTodolistTitleHandler}
                        />
                        <IconButton onClick={removeTodolist}>
                            <Delete/>
                        </IconButton>
                    </h3>
                    <AddItemForm addItem={addTask}/>
                    <div>
                        {
                            filteredTasks.length > 0
                                ? filteredTasks.map(task => <Task key={task.id} task={task} todolistId={id}/>)
                                : <p style={{textAlign: 'center'}}>Task list is empty</p>
                        }
                    </div>
                    <div style={{display:'flex', justifyContent: 'space-between'}}>
                        <Button
                            color="primary"
                            variant={filter === 'all' ? 'outlined' : 'text'}
                            onClick={() => onClickFilter('all')}>
                            All
                        </Button>
                        <Button
                            color="primary"
                            variant={filter === 'active' ? 'outlined' : 'text'}
                            onClick={() => onClickFilter('active')}>
                            Active
                        </Button>
                        <Button
                            color="primary"
                            variant={filter === 'completed' ? 'outlined' : 'text'}
                            onClick={() => onClickFilter('completed')}>
                            Completed
                        </Button>
                    </div>
                </div>
            </Paper>
        </Grid>
    );
})