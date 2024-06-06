import { AddItemForm } from "common/components/AddItemForm/AddItemForm"
import { Grid } from "@mui/material"
import { Todolist } from "./Todolist/Todolist"
import { useCallback, useEffect } from "react"
import { todolistsThunk } from "features/TodolistList/todolists-reducer"
import { useSelector } from "react-redux"
import { todolistSelectors } from "features/TodolistList/Todolist/todolist.selectors"
import { Navigate } from "react-router-dom"
import { selectAuthIsAuthorized } from "features/auth/model/auth-reducer"
import { useAppDispatch } from "common/hooks"

type TodolistListProps = {
    demo?: boolean
}
export const TodolistList = ({ demo = false }: TodolistListProps) => {
    const dispatch = useAppDispatch()
    const todolists = useSelector(todolistSelectors)
    const isAuthorized = useSelector(selectAuthIsAuthorized)

    useEffect(() => {
        if (!isAuthorized) {
            return
        }
        dispatch(todolistsThunk.getTodolists())
    }, [dispatch, isAuthorized])

    const addTodolist = useCallback(
        (title: string) => {
            dispatch(todolistsThunk.addTodolist({ title }))
        },
        [dispatch],
    )

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
