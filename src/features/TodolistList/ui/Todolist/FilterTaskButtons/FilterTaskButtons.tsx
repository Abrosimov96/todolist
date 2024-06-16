import React from "react"
import { Button } from "@mui/material"
import { useActions } from "common/hooks"
import { FilterValuesType, TodolistType } from "features/TodolistList/api/todolists.types"
import { todolistsActions } from "features/TodolistList/model/todolists-reducer"

type Props = {
    todolist: TodolistType
}

export const FilterTaskButtons = ({ todolist }: Props) => {
    const { filter, id: todolistId } = todolist
    const { changeTodolistFilter } = useActions(todolistsActions)

    const onFilterTasks = (filter: FilterValuesType) => {
        changeTodolistFilter({ filter, todolistId })
    }

    return (
        <>
            <Button
                variant={filter === "all" ? "outlined" : "text"}
                onClick={() => onFilterTasks("all")}
                color={"inherit"}
            >
                All
            </Button>
            <Button
                variant={filter === "active" ? "outlined" : "text"}
                onClick={() => onFilterTasks("active")}
                color={"primary"}
            >
                Active
            </Button>
            <Button
                variant={filter === "completed" ? "outlined" : "text"}
                onClick={() => onFilterTasks("completed")}
                color={"secondary"}
            >
                Completed
            </Button>
        </>
    )
}
