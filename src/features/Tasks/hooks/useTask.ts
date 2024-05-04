import {removeTaskTC, updateTaskTC} from '../../../state/tasks-reducer';
import {ChangeEvent, useCallback} from 'react';
import {TaskStatuses} from '../../../api/task-api';
import {useAppDispatch} from '../../../state/store';

export const useTask = (todolistId: string, id: string) => {
    const dispatch = useAppDispatch()

    const onRemoveHandler = () => {
        dispatch(removeTaskTC(todolistId, id))
    };

    const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTaskTC(todolistId, id, e.target.checked ? {status: TaskStatuses.Completed} : {status: TaskStatuses.New} ))
    }, [dispatch, id, todolistId]);

    const onChangeTitleHandler = (title: string) => {
        dispatch(updateTaskTC(todolistId, id, {title} ))
    }

    return {
        onRemoveHandler,
        onChangeStatusHandler,
        onChangeTitleHandler
    }
}