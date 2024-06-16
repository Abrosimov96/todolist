import React, { useState } from "react"
import { taskApi } from "features/TodolistList/api/task-api"
import { TaskPriorities, TaskStatuses } from "common/enums/enums"
import { UpdateTaskModelType } from "features/TodolistList/api/tasks.types"

export default {
    title: "API_ASK",
}

export const GetTask = () => {
    const [state, setState] = useState<any>(null)
    const [inputValue, setInputValue] = useState<string>("")
    const onGetTasks = () => {
        taskApi.getTasks(inputValue).then((res) => {
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
                <button onClick={onGetTasks}>Get Tasks</button>
            </div>
        </div>
    )
}

// export const CreateTasks = () => {
//     const [state, setState] = useState<any>(null)
//     const [inputValueID, setInputValueID] = useState<string>("")
//     const [inputValue, setInputValue] = useState<string>("")
//
//     function createTask() {
//         taskApi.createTask(inputValueID, inputValue).then((res) => {
//             setState(res.data)
//         })
//     }
//
//     return (
//         <div>
//             {JSON.stringify(state)}
//             <div>
//                 <input
//                     placeholder={"Todolist id..."}
//                     value={inputValueID}
//                     onChange={(e) => setInputValueID(e.currentTarget.value)}
//                 />
//                 <input
//                     placeholder={"Todolist title..."}
//                     value={inputValue}
//                     onChange={(e) => setInputValue(e.currentTarget.value)}
//                 />
//                 <button onClick={createTask}>Create Task</button>
//             </div>
//         </div>
//     )
// }

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [inputValueID, setInputValueID] = useState<string>("")
    const [inputValue, setInputValue] = useState<string>("")

    function deleteTask() {
        taskApi.deleteTask({ todolistId: inputValueID, taskId: inputValue }).then((res) => {
            setState(res.data)
        })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input
                    placeholder={"Todolist ID..."}
                    value={inputValueID}
                    onChange={(e) => setInputValueID(e.currentTarget.value)}
                />
                <input
                    placeholder={"Task id..."}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.currentTarget.value)}
                />
                <button onClick={deleteTask}>Delete Task</button>
            </div>
        </div>
    )
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const [taskId, setTaskId] = useState<string>("")
    const [title, setTitle] = useState<string>("")

    function updateTask() {
        const task: UpdateTaskModelType = {
            title,
            deadline: "",
            description: "",
            priority: TaskPriorities.Low,
            startDate: "",
            status: TaskStatuses.New,
        }

        taskApi.updateTask({ todolistId, taskId, domainModel: task }).then((res) => {
            setState(res.data)
        })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input
                    placeholder={"Todolist ID..."}
                    value={todolistId}
                    onChange={(e) => setTodolistId(e.currentTarget.value)}
                />
                <input placeholder={"Task ID..."} value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)} />
                <input placeholder={"Title..."} value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
                <button onClick={updateTask}>Update Task</button>
            </div>
        </div>
    )
}
