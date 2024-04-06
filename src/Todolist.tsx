import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {ChangeEvent} from 'react';
import {AddItemForm} from './AddItemFor';
import {FilterValuesType} from './App';
import {EditableSpan} from './EditableSpan';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from './state/store';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {changeFilterTodolistAC, changeTitleTodolistAC, removeTodolistAC} from './state/todolists-reducer';

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

type PropsType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};

export function Todolist({
                             id,
                             title,
                             filter,
                         }: PropsType) {

    const dispatch = useDispatch()
    const tasks = useSelector<AppStoreType, TaskType[]>(store => store.tasks[id])

    const addTask = (title: string) => {
        dispatch(addTaskAC(title, id))
    };

    const onClickFilter = (filter: FilterValuesType) => {
        dispatch(changeFilterTodolistAC(id, filter));
    };

    const removeTodolist = () => {
        dispatch(removeTodolistAC(id))
    };

    const onChangeTodolistTitleHandler = (newTitle: string) => {
        dispatch(changeTitleTodolistAC(id, newTitle));
    };

    let filteredTasks = tasks;

    if (filter === 'completed') {
        filteredTasks = filteredTasks.filter(
            (task) => task.isDone,
        );
    }
    if (filter === 'active') {
        filteredTasks = filteredTasks.filter(
            (task) => !task.isDone,
        );
    }

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
                {filteredTasks.map((task) => {
                    const onRemoveHandler = () => dispatch(removeTaskAC(task.id, id));
                    const onChangeStatusHandler = (
                        e: ChangeEvent<HTMLInputElement>,
                    ) => dispatch(changeTaskStatusAC(task.id, e.target.checked, id));
                    const onChangeTitleHandler = (newTitle: string) =>
                        dispatch(changeTaskTitleAC(task.id, newTitle, id));
                    return (
                        <div
                            key={task.id}
                            className={task.isDone ? 'is-done' : ''}>
                            <Checkbox
                                checked={task.isDone}
                                onChange={onChangeStatusHandler}
                            />
                            <EditableSpan
                                title={task.title}
                                onChange={onChangeTitleHandler}
                            />
                            <IconButton onClick={onRemoveHandler}>
                                <Delete/>
                            </IconButton>
                        </div>
                    );
                })}
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
}
