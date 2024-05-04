import {memo} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import {EditableSpan} from '../../components/EditableSpan/EditableSpan';
import {Delete} from '@mui/icons-material';
import {useTask} from './hooks/useTask';
import {TaskStatuses, TaskType} from '../../api/task-api';
import s from './Tasks.module.css'

type TaskProps = {
    todolistId: string
    task: TaskType
};
export const Task = memo(({todolistId, task}: TaskProps) => {
    const {
        onRemoveHandler,
        onChangeStatusHandler,
        onChangeTitleHandler
    } = useTask(todolistId, task.id)

    return <div className={s.container}>
        <div className={task.status === TaskStatuses.Completed ? s.isDone : ''}>
            <Checkbox
                checked={task.status === TaskStatuses.Completed}
                onChange={onChangeStatusHandler}
            />
            <EditableSpan
                title={task.title}
                onChange={onChangeTitleHandler}
            />
        </div>
        <IconButton onClick={onRemoveHandler}>
            <Delete/>
        </IconButton>
    </div>
})