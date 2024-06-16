import { memo } from "react"
import { Checkbox, IconButton } from "@mui/material"
import { EditableSpan } from "common/components/EditableSpan/EditableSpan"
import { Delete } from "@mui/icons-material"
import { useTask } from "features/TodolistList/ui/Todolist/Tasks/Task/hooks/useTask"
import s from "features/TodolistList/ui/Todolist/Tasks/Task/Tasks.module.css"
import { TaskStatuses } from "common/enums/enums"
import { TaskType } from "features/TodolistList/api/tasks.types"

type TaskProps = {
    task: TaskType
}
export const Task = memo(({ task }: TaskProps) => {
    const { isTaskCompleted, onRemoveTask, onChangeTaskStatus, onChangeTaskTitle, title } = useTask(task)

    const isLoading = task.entityStatus === "loading"

    return (
        <div className={s.container}>
            <div className={isTaskCompleted ? s.isDone : ""}>
                <Checkbox
                    disabled={isLoading}
                    checked={task.status === TaskStatuses.Completed}
                    onChange={onChangeTaskStatus}
                />
                <EditableSpan disabled={isLoading} title={title} onChange={onChangeTaskTitle} />
            </div>
            <IconButton onClick={onRemoveTask} disabled={isLoading}>
                <Delete />
            </IconButton>
        </div>
    )
})
