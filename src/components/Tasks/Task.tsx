import {memo} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {Delete} from '@material-ui/icons';
import {TaskType} from '../Todolists/Todolist';
import {useTask} from './hooks/useTask';

type TaskProps = {
    todolistId: string
    task: TaskType
};
export const Task = memo(({todolistId, task}: TaskProps) => {
    console.log('TASK')
    const {
        onRemoveHandler,
        onChangeStatusHandler,
        onChangeTitleHandler
    } = useTask(todolistId, task.id)

    return <div className={task.isDone ? 'is-done' : ''}>
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
})