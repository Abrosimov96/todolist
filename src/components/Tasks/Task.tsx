import {memo} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {Delete} from '@material-ui/icons';
import {useTask} from './hooks/useTask';
import {TaskStatuses, TaskType} from '../../api/task-api';

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

    return <div className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox
            checked={task.status === TaskStatuses.Completed}
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