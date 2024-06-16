import { tasksThunks } from "features/TodolistList/model/tasks-reducer"
import { ChangeEvent } from "react"
import { useActions } from "common/hooks"
import { TaskStatuses } from "common/enums/enums"
import { TaskType } from "features/TodolistList/api/tasks.types"

export const useTask = (task: TaskType) => {
    const { id: taskId, todoListId: todolistId, title, status } = task

    const { removeTask, updateTask } = useActions(tasksThunks)

    const onRemoveTask = () => {
        removeTask({ taskId, todolistId })
    }

    const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        updateTask({ taskId, domainModel: { status }, todolistId })
    }

    const onChangeTaskTitle = (title: string) => {
        updateTask({ taskId, domainModel: { title }, todolistId })
    }

    const isTaskCompleted = status === TaskStatuses.Completed

    return {
        onRemoveTask,
        onChangeTaskStatus,
        onChangeTaskTitle,
        title,
        isTaskCompleted,
    }
}
