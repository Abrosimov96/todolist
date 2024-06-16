import { TodolistType } from "features/TodolistList/api/todolists.types"
import { useActions } from "common/hooks"
import { todolistsThunk } from "features/TodolistList/model/todolists-reducer"
import { IconButton } from "@mui/material"
import { Delete } from "@mui/icons-material"
import { EditableSpan } from "common/components/EditableSpan/EditableSpan"

type Props = {
    todolist: TodolistType
}

export const TodolistTitle = ({ todolist }: Props) => {
    const { removeTodolist, changeTodolistTitle } = useActions(todolistsThunk)
    const { title, id: todolistId, entityStatus } = todolist

    const onRemoveTodolist = () => {
        removeTodolist({ todolistId })
    }

    const onChangeTodolistTitle = (title: string) => {
        changeTodolistTitle({ title, todolistId })
    }

    return (
        <h3 style={{ textAlign: "center" }}>
            <EditableSpan title={title} onChange={onChangeTodolistTitle} />
            <IconButton onClick={onRemoveTodolist} disabled={entityStatus === "loading"}>
                <Delete />
            </IconButton>
        </h3>
    )
}
