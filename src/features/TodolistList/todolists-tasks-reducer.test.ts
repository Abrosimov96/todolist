import { tasksReducer, TasksStateType } from "features/TodolistList/Todolist/Tasks/tasks-reducer"
import { todolistsReducer, todolistsThunk, TodolistType } from "features/TodolistList/todolists-reducer"
import { ActionForTest } from "common/types"

test("ids should be equal", () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistType> = []

    const todolist = { id: "todolistId3", title: "What to learn", addedDate: "", order: 0 }

    const action: ActionForTest<typeof todolistsThunk.addTodolist.fulfilled> = {
        type: todolistsThunk.addTodolist.fulfilled.type,
        payload: { todolist },
    }

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todolist.id)
    expect(idFromTodolists).toBe(action.payload.todolist.id)
})
