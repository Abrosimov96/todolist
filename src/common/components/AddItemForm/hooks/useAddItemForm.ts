import { ChangeEvent, KeyboardEvent, useState } from "react"

export const useAddItemForm = (addItem: (title: string) => void) => {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState("")

    const addNewTask = () => {
        if (newTaskTitle.trim() === "") {
            setNewTaskTitle("")
            setError("Field is required!")
            return
        }
        addItem(newTaskTitle)
        setNewTaskTitle("")
    }

    const onNewTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.target.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError("")
        e.code === "Enter" && addNewTask()
    }

    return {
        newTaskTitle,
        error,
        addNewTask,
        onNewTitleHandler,
        onKeyPressHandler,
    }
}
