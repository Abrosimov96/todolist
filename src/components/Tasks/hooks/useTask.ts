import {useDispatch} from 'react-redux';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../../../state/tasks-reducer';
import {ChangeEvent, useCallback} from 'react';
import {TaskStatuses} from '../../../api/task-api';

export const useTask = (todolistId: string, id: string) => {
    const dispatch = useDispatch()

    const onRemoveHandler = () => dispatch(removeTaskAC(id, todolistId));

    const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(id, e.target.checked ? TaskStatuses.Completed : TaskStatuses.New, todolistId))
    }, [dispatch, id, todolistId]);

    const onChangeTitleHandler = (newTitle: string) => {
        dispatch(changeTaskTitleAC(id, newTitle, todolistId))
    }

    return {
        onRemoveHandler,
        onChangeStatusHandler,
        onChangeTitleHandler
    }
}