import { TodolistType } from "features/TodolistList/api/todolists.types"
import { useSelector } from "react-redux"
import { TaskStatuses } from "common/enums"
import { Task } from "features/TodolistList/ui/Todolist/Tasks/Task/Task"
import { selectAllTasks } from "features/TodolistList/model/tasks.selectors"

type Props = {
    todolist: TodolistType
}

export const Tasks = ({ todolist }: Props) => {
    const tasks = useSelector(selectAllTasks)

    let tasksForTodolist = tasks[todolist.id]

    if (todolist.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter((t) => t.status === TaskStatuses.New)
    }
    if (todolist.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter((t) => t.status === TaskStatuses.Completed)
    }
    return (
        <>
            {tasksForTodolist.map((t) => (
                <Task key={t.id} task={t} />
            ))}
        </>
    )
}
