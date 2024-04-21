import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {memo, useCallback, useMemo} from 'react';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {FilterValuesType, TodolistType} from '../../App';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../state/store';
import {addTaskAC} from '../../state/tasks-reducer';
import {changeFilterTodolistAC, changeTitleTodolistAC, removeTodolistAC} from '../../state/todolists-reducer';
import {Task} from '../Tasks/Task';

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

type PropsType = {
    todolist: TodolistType
};

export const Todolist = memo(({todolist}: PropsType) => {
    console.log('TODOLIST')
    const { id, title, filter} = todolist

    const dispatch = useDispatch()
    const tasks = useSelector<AppStoreType, TaskType[]>(store => store.tasks[id])


    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, id))
    }, [dispatch, id]);

    const onClickFilter = useCallback((filter: FilterValuesType) => {
        dispatch(changeFilterTodolistAC(id, filter));
    },[dispatch, id]);

    const removeTodolist = useCallback(() => {
        dispatch(removeTodolistAC(id))
    },[dispatch, id]);

    const onChangeTodolistTitleHandler = useCallback((newTitle: string) => {
        dispatch(changeTitleTodolistAC(id, newTitle));
    }, [dispatch, id]);

    let filteredTasks: TaskType[];

    filteredTasks = useMemo(() => {
        if (filter === 'completed') {
            return tasks.filter((task) => task.isDone);
        }
        if (filter === 'active') {
            return tasks.filter((task) => !task.isDone);
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
