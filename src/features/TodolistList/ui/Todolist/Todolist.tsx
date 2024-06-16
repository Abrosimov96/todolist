import { Grid, Paper } from "@mui/material"
import { memo, useEffect } from "react"
import { AddItemForm } from "common/components/AddItemForm/AddItemForm"
import { tasksThunks } from "features/TodolistList/model/tasks-reducer"
import { useActions } from "common/hooks"
import { TodolistType } from "features/TodolistList/api/todolists.types"
import { FilterTaskButtons } from "features/TodolistList/ui/Todolist/FilterTaskButtons/FilterTaskButtons"
import { TodolistTitle } from "features/TodolistList/ui/Todolist/TodolistTitle/TodolistTitle"
import { Tasks } from "features/TodolistList/ui/Todolist/Tasks/Tasks"

type PropsType = {
    todolist: TodolistType
    demo?: boolean
}

export const Todolist = memo(({ todolist, demo = false }: PropsType) => {
    const { fetchTasks, addTask } = useActions(tasksThunks)

    useEffect(() => {
        fetchTasks(todolist.id)
    }, [fetchTasks, todolist])

    const onAddTask = (title: string) => {
        return addTask({ title, todolistId: todolist.id })
    }

    const isLoading = todolist.entityStatus === "loading"
    return (
        <Grid item>
            <Paper style={{ padding: "10px" }} elevation={3}>
                <div>
                    <TodolistTitle todolist={todolist} />
                    <AddItemForm addItem={onAddTask} disabled={isLoading} />
                    <Tasks todolist={todolist} />
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <FilterTaskButtons todolist={todolist} />
                    </div>
                </div>
            </Paper>
        </Grid>
    )
})
