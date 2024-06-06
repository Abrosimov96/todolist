import {
    todolistsReducer,
    TodolistType,
    FilterValuesType,
    todolistsActions,
    todolistsThunk,
} from "features/TodolistList/todolists-reducer"
import { ActionForTest, RequestStatusType } from "common/types"

let startState: Array<TodolistType>
beforeEach(() => {
    startState = [
        { id: "todolistId1", title: "What to learn", filter: "all", addedDate: "", order: 0, entityStatus: "idle" },
        { id: "todolistId2", title: "What to buy", filter: "all", addedDate: "", order: 0, entityStatus: "idle" },
    ]
})
test("correct todolist should be removed", () => {
    const action: ActionForTest<typeof todolistsThunk.removeTodolist.fulfilled> = {
        type: todolistsThunk.removeTodolist.fulfilled.type,
        payload: {
            todolistId: "todolistId1",
        },
    }

    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe("todolistId2")
})

test("correct todolist should be added", () => {
    const newTodolist = { id: "todolistId1", title: "New Todolist", filter: "all", addedDate: "", order: 0 }

    const action: ActionForTest<typeof todolistsThunk.addTodolist.fulfilled> = {
        type: todolistsThunk.addTodolist.fulfilled.type,
        payload: { todolist: newTodolist },
    }

    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolist.title)
    expect(endState[0].filter).toBe("all")
})

test("correct todolist should change its name", () => {
    const newTodolistTitle = "New Todolist"
    const action: ActionForTest<typeof todolistsThunk.changeTodolistTitle.fulfilled> = {
        type: todolistsThunk.changeTodolistTitle.fulfilled.type,
        payload: {
            title: newTodolistTitle,
            todolistId: "todolistId2",
        },
    }

    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(newTodolistTitle)
})

test("correct filter of todolist should changed", () => {
    const newFilter: FilterValuesType = "completed"

    const action = todolistsActions.changeTodolistFilter({ todolistId: "todolistId2", filter: newFilter })

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe(newFilter)
})

test("todolists should be set to the state", () => {
    const action: ActionForTest<typeof todolistsThunk.getTodolists.fulfilled> = {
        type: todolistsThunk.getTodolists.fulfilled.type,
        payload: {
            todolists: startState,
        },
    }

    const endState = todolistsReducer([], action)

    expect(endState.length).toBe(2)
})

test("correct status of todolist should changed", () => {
    const newStatus: RequestStatusType = "loading"

    const action = todolistsActions.changeTodolistEntityStatus({ todolistId: "todolistId2", status: newStatus })

    const endState = todolistsReducer(startState, action)

    expect(endState[0].entityStatus).toBe("idle")
    expect(endState[1].entityStatus).toBe(newStatus)
})

// test('correct todolist should be updated', () => {
//   const newUpdate: Partial<TodolistType> = {
//     title: 'Juice',
//     entityStatus: 'loading',
//     filter: 'completed'
//   };
//
//   const action = changeTodolistFilterAC({todolistId: ''});
//
//   const endState = todolistsReducer(startState, action);
//
//   expect(endState[1].entityStatus).toBe(newUpdate.entityStatus);
//   expect(endState[1].filter).toBe(newUpdate.filter);
//   expect(endState[1].title).toBe(newUpdate.title);
// });
