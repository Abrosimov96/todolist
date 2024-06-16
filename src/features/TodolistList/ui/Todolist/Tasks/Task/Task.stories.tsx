import type { Meta } from "@storybook/react"
import { Task } from "features/TodolistList/ui/Todolist/Tasks/Task/Task"
import { ReduxStoreProviderDecorator } from "stories/ReduxStoreProviderDecorator"
import { TaskPriorities, TaskStatuses } from "common/enums/enums"

const meta = {
    title: "Task Component",
    component: Task,
    decorators: [ReduxStoreProviderDecorator],
} satisfies Meta<typeof Task>

export const TaskBaseExample = () => {
    return (
        <>
            <Task
                task={{
                    id: "3",
                    title: "React",
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Low,
                    description: "",
                    order: 0,
                    deadline: "",
                    startDate: "",
                    addedDate: "",
                    todoListId: "todolistId1",
                    entityStatus: "idle",
                }}
            />
            <Task
                task={{
                    id: "3",
                    title: "React",
                    status: TaskStatuses.Completed,
                    priority: TaskPriorities.Low,
                    description: "",
                    order: 0,
                    deadline: "",
                    startDate: "",
                    addedDate: "",
                    todoListId: "todolistId1",
                    entityStatus: "idle",
                }}
            />
        </>
    )
}

export const TaskDisabled = () => {
    return (
        <>
            <Task
                task={{
                    id: "3",
                    title: "React",
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Low,
                    description: "",
                    order: 0,
                    deadline: "",
                    startDate: "",
                    addedDate: "",
                    todoListId: "todolistId1",
                    entityStatus: "loading",
                }}
            />
            <Task
                task={{
                    id: "3",
                    title: "React",
                    status: TaskStatuses.Completed,
                    priority: TaskPriorities.Low,
                    description: "",
                    order: 0,
                    deadline: "",
                    startDate: "",
                    addedDate: "",
                    todoListId: "todolistId1",
                    entityStatus: "idle",
                }}
            />
        </>
    )
}

export default meta
