import { ChangeEvent, KeyboardEvent, useState } from "react"
import { unwrapResult } from "@reduxjs/toolkit"
import { BaseResponseType } from "common/types"

export const useAddItemForm = (addItem: (title: string) => Promise<any>) => {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState("")

    const addNewTask = () => {
        if (newTaskTitle.trim() !== "") {
            addItem(newTaskTitle)
                .then(unwrapResult)
                .then(() => {
                    setNewTaskTitle("")
                })
                .catch((error: BaseResponseType) => {
                    if (error?.resultCode) {
                        setError(error.messages[0])
                    }
                })
        } else {
            setError("Title is required")
        }
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
