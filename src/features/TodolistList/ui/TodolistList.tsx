import { AddItemForm } from "common/components/AddItemForm/AddItemForm"
import { Grid } from "@mui/material"
import { Todolist } from "features/TodolistList/ui/Todolist/Todolist"
import { useEffect } from "react"
import { todolistsThunk } from "features/TodolistList/model/todolists-reducer"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { selectAuthIsAuthorized } from "features/auth/model/auth-reducer"
import { useActions } from "common/hooks"
import { todolistSelectors } from "features/TodolistList/model/todolist.selectors"

type TodolistListProps = {
    demo?: boolean
}
export const TodolistList = ({ demo = false }: TodolistListProps) => {
    const todolists = useSelector(todolistSelectors)
    const isAuthorized = useSelector(selectAuthIsAuthorized)

    const { addTodolist: addTodolistThunk, getTodolists } = useActions(todolistsThunk)

    useEffect(() => {
        if (!isAuthorized) {
            return
        }
        getTodolists()
    }, [getTodolists, isAuthorized])

    const addTodolist = (title: string) => {
        return addTodolistThunk({ title })
    }

    if (!isAuthorized) {
        return <Navigate to={"/login"} />
    }

    return (
        <>
            <AddItemForm addItem={addTodolist} />
            <Grid container spacing={3}>
                {todolists.map((todolist) => (
                    <Todolist key={todolist.id} todolist={todolist} demo={demo} />
                ))}
            </Grid>
        </>
    )
}
