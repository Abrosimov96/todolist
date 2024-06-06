import React, { useEffect, useState } from "react"
import { todolistsApi, TodolistTypeAPI } from "features/TodolistList/todolists-api"

export default {
    title: "API_TODOLIST",
}

export const GetTodolists = () => {
    const [state, setState] = useState<TodolistTypeAPI[]>([])
    useEffect(() => {
        todolistsApi.getTodolists().then((res) => {
            setState(res.data)
        })
    }, [])
    return (
        <ul>
            {state.map((t) => (
                <li key={t.id}>
                    <p>{t.id}</p>
                    <p>{t.title}</p>
                    <p>{t.addedDate}</p>
                    <p>{t.order}</p>
                </li>
            ))}
        </ul>
    )
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [inputValue, setInputValue] = useState<string>("")

    function createTodolist() {
        todolistsApi.createTodolist(inputValue).then((res) => {
            setState(res.data)
        })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input
                    placeholder={"Todolist title..."}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.currentTarget.value)}
                />
                <button onClick={createTodolist}>Create Todolist</button>
            </div>
        </div>
    )
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [inputValue, setInputValue] = useState<string>("")

    function deleteTodolist() {
        todolistsApi.deleteTodolist(inputValue).then((res) => {
            setState(res.data)
        })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input
                    placeholder={"Todolist ID..."}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.currentTarget.value)}
                />
                <button onClick={deleteTodolist}>Delete Todolist</button>
            </div>
        </div>
    )
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [inputValue, setInputValue] = useState<string>("")
    const [inputTitle, setInputTitle] = useState<string>("")

    function updateTodolist() {
        todolistsApi.updateTodolist({ todolistId: inputValue, title: inputTitle }).then((res) => {
            setState(res.data)
        })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input
                    placeholder={"Todolist ID..."}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.currentTarget.value)}
                />
                <input
                    placeholder={"Todolist title..."}
                    value={inputTitle}
                    onChange={(e) => setInputTitle(e.currentTarget.value)}
                />
                <button onClick={updateTodolist}>Update Todolist</button>
            </div>
        </div>
    )
}
