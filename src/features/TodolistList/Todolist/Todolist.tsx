import { Button, Grid, IconButton, Paper } from "@mui/material"
import { Delete } from "@mui/icons-material"
import { memo, useCallback, useMemo } from "react"
import { AddItemForm } from "common/components/AddItemForm/AddItemForm"
import { EditableSpan } from "common/components/EditableSpan/EditableSpan"
import {
    FilterValuesType,
    todolistsActions,
    todolistsThunk,
    TodolistType,
} from "features/TodolistList/todolists-reducer"
import { Task } from "./Tasks/Task"
import { TaskType } from "features/TodolistList/Todolist/Tasks/task-api"
import { tasksThunks } from "features/TodolistList/Todolist/Tasks/tasks-reducer"
import { selectCurrentTasks } from "features/TodolistList/Todolist/Tasks/tasks.selectors"
import { useSelector } from "react-redux"
import { useAppDispatch } from "common/hooks"
import { TaskStatuses } from "common/enums/enums"

type PropsType = {
    todolist: TodolistType
    demo?: boolean
}

export const Todolist = memo(({ todolist, demo = false }: PropsType) => {
    const { id, title, filter, entityStatus } = todolist
    const isLoading = entityStatus === "loading"

    const dispatch = useAppDispatch()
    const tasks = useSelector(selectCurrentTasks(id))

    const addTask = useCallback(
        (title: string) => {
            dispatch(tasksThunks.addTask({ todolistId: id, title }))
        },
        [dispatch, id],
    )

    const onClickFilter = useCallback(
        (filter: FilterValuesType) => {
            dispatch(todolistsActions.changeTodolistFilter({ todolistId: id, filter }))
        },
        [dispatch, id],
    )

    const removeTodolist = useCallback(() => {
        dispatch(todolistsThunk.removeTodolist({ todolistId: id }))
    }, [dispatch, id])

    const onChangeTodolistTitleHandler = useCallback(
        (title: string) => {
            dispatch(todolistsThunk.changeTodolistTitle({ todolistId: id, title }))
        },
        [dispatch, id],
    )

    let filteredTasks: TaskType[]

    filteredTasks = useMemo(() => {
        if (filter === "completed") {
            return tasks.filter((task) => task.status === TaskStatuses.Completed)
        }
        if (filter === "active") {
            return tasks.filter((task) => task.status === TaskStatuses.New)
        }
        return tasks
    }, [tasks, filter])

    return (
        <Grid item>
            <Paper style={{ padding: "10px" }} elevation={3}>
                <div>
                    <h3 style={{ textAlign: "center" }}>
                        <EditableSpan title={title} onChange={onChangeTodolistTitleHandler} disabled={isLoading} />
                        <IconButton onClick={removeTodolist} disabled={isLoading}>
                            <Delete />
                        </IconButton>
                    </h3>
                    <AddItemForm addItem={addTask} disabled={isLoading} />
                    <div>
                        {filteredTasks?.length > 0 ? (
                            filteredTasks.map((task) => <Task key={task.id} task={task} todolistId={id} />)
                        ) : (
                            <p style={{ textAlign: "center" }}>Task list is empty</p>
                        )}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Button
                            color="primary"
                            variant={filter === "all" ? "outlined" : "text"}
                            onClick={() => onClickFilter("all")}
                        >
                            All
                        </Button>
                        <Button
                            color="primary"
                            variant={filter === "active" ? "outlined" : "text"}
                            onClick={() => onClickFilter("active")}
                        >
                            Active
                        </Button>
                        <Button
                            color="primary"
                            variant={filter === "completed" ? "outlined" : "text"}
                            onClick={() => onClickFilter("completed")}
                        >
                            Completed
                        </Button>
                    </div>
                </div>
            </Paper>
        </Grid>
    )
})
