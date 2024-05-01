import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {memo, useCallback, useEffect, useMemo} from 'react';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {EditableSpan} from '../EditableSpan/EditableSpan';
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
    const { id, title, filter} = todolist

    const dispatch = useAppDispatch()
    const tasks = useSelector<AppRootStateType, TaskType[]>(store => store.tasks[id])

    useEffect(() => {
        dispatch(fetchTasksTC(id))
    }, [dispatch, id]);


    const addTask = useCallback((title: string) => {
        dispatch(addTaskTC(id,title))
    }, [dispatch, id]);

    const onClickFilter = useCallback((filter: FilterValuesType) => {
        dispatch(changeFilterTodolistAC(id, filter));
    },[dispatch, id]);

    const removeTodolist = useCallback(() => {
        dispatch(removeTodolistTC(id))
    },[dispatch, id]);

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
        <div>
            <h3>
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
                    filteredTasks.map(task => <Task key={task.id} task={task} todolistId={id}/>)
                }
            </div>
            <div>
                <Button
                    variant={filter === 'all' ? 'contained' : 'text'}
                    onClick={() => onClickFilter('all')}>
                    All
                </Button>
                <Button
                    color="primary"
                    variant={filter === 'active' ? 'contained' : 'text'}
                    onClick={() => onClickFilter('active')}>
                    Active
                </Button>
                <Button
                    color="secondary"
                    variant={filter === 'completed' ? 'contained' : 'text'}
                    onClick={() => onClickFilter('completed')}>
                    Completed
                </Button>
            </div>
        </div>
    );
})
