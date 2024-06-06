import { tasksThunks } from "features/TodolistList/Todolist/Tasks/tasks-reducer"
import { ChangeEvent, useCallback } from "react"
import { useAppDispatch } from "common/hooks"
import { TaskStatuses } from "common/enums/enums"

export const useTask = (todolistId: string, taskId: string) => {
    const dispatch = useAppDispatch()

    const onRemoveHandler = () => {
        dispatch(tasksThunks.removeTask({ todolistId, taskId }))
    }

    const onChangeStatusHandler = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(
                tasksThunks.updateTask({
                    todolistId,
                    taskId,
                    domainModel: e.target.checked ? { status: TaskStatuses.Completed } : { status: TaskStatuses.New },
                }),
            )
        },
        [dispatch, taskId, todolistId],
    )

    const onChangeTitleHandler = (title: string) => {
        dispatch(
            tasksThunks.updateTask({
                todolistId,
                taskId,
                domainModel: { title },
            }),
        )
    }

    return {
        onRemoveHandler,
        onChangeStatusHandler,
        onChangeTitleHandler,
    }
}
