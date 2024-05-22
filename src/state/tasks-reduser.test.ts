import {
    addTaskAC, changeTasksStatusAC,
    removeTaskAC,
    setTasksAC,
    tasksReducer,
    TasksStateType,
    updateTaskAC,
} from './tasks-reducer';
import {addTodolist, removeTodolist, setTodolists} from './todolists-reducer';
import {TaskPriorities, TaskStatuses} from '../api/task-api';
import {RequestStatusType} from './app-reducer';
import {TodolistTypeAPI} from '../api/todolists-api';

let startState: TasksStateType
beforeEach(() => {
    startState = {
        todolistId1: [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                description: '',
                order: 0,
                deadline: '',
                startDate: '',
                addedDate: '',
                todoListId: 'todolistId1',
                entityStatus: 'idle'
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                description: '',
                order: 0,
                deadline: '',
                startDate: '',
                addedDate: '',
                todoListId: 'todolistId1',
                entityStatus: 'idle'
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                description: '',
                order: 0,
                deadline: '',
                startDate: '',
                addedDate: '',
                todoListId: 'todolistId1',
                entityStatus: 'idle'
            },
        ],
        todolistId2: [
            {
                id: '1',
                title: 'bread',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                description: '',
                order: 0,
                deadline: '',
                startDate: '',
                addedDate: '',
                todoListId: 'todolistId2',
                entityStatus: 'idle'
            },
            {
                id: '2',
                title: 'milk',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                description: '',
                order: 0,
                deadline: '',
                startDate: '',
                addedDate: '',
                todoListId: 'todolistId2',
                entityStatus: 'idle'
            },
            {
                id: '3',
                title: 'tea',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                description: '',
                order: 0,
                deadline: '',
                startDate: '',
                addedDate: '',
                todoListId: 'todolistId2',
                entityStatus: 'idle'
            },
        ],
    };
})

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC({taskId: '2', todolistId: 'todolistId2'});
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(2);
    expect(
        endState['todolistId2'].every((t) => t.id !== '2'),
    ).toBeTruthy();
});

test('correct task should be added to correct array', () => {
    const action = addTaskAC({
        task: {
            id: '10',
            title: 'juice',
            status:
            TaskStatuses.New,
            priority:
            TaskPriorities.Low,
            description: '',
            order: 0,
            deadline: '',
            startDate: '',
            addedDate: '',
            todoListId: 'todolistId1',
            entityStatus: 'idle'
        }
    });

    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'].length).toBe(4);
    expect(endState['todolistId2'].length).toBe(3);
    expect(endState['todolistId1'][0].id).toBeDefined();
    expect(endState['todolistId1'][0].title).toBe('juice');
    expect(endState['todolistId1'][0].status).toBe(TaskStatuses.New);
});

test('status of specifie task should be changed', () => {
    const action = updateTaskAC({taskId: '2', model: {status: TaskStatuses.New}, todolistId: 'todolistId2'});

    const endState = tasksReducer(startState, action);

    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New);
    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed);
});

test('title of specifie task should be changed', () => {
    const action = updateTaskAC({taskId: '2', model: {title: 'juice'}, todolistId: 'todolistId2'});

    const endState = tasksReducer(startState, action);

    expect(endState['todolistId2'][1].title).toBe('juice');
    expect(endState['todolistId1'][1].title).toBe('JS');
});

test('new array should be added when new todolist is added', () => {
    const action = addTodolist({
        todolist: {
            id: 'todolistId3', title:
                'new todolist', addedDate:
                '', order:
                0
        }
    });

    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);
    const newKey = keys.find(
        (k) => k !== 'todolistId1' && k !== 'todolistId2',
    );
    if (!newKey) {
        throw Error('new key should be added!');
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
    // expect(endState[newKey].keys).toBe('new todolist');
});

test('property with todolistId should be deleted', () => {
    const action = removeTodolist({todolistId: 'todolistId2'});

    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).toBeUndefined();
});

test('empty arrays should be added when we set todolists', () => {
    const action = setTodolists({
        todolists: [
            {id: '1', title: 'title 1', order: 0, addedDate: ''},
            {id: '2', title: 'title 2', order: 0, addedDate: ''},
        ]
    })

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toBeDefined()
    expect(endState['2']).toBeDefined()
});

test('tasks should be added for todolist', () => {
    const action = setTasksAC({
        todolistId: 'todolistId3', tasks: [
            {
                id: '1',
                title: 'REACT',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                description: '',
                order: 0,
                deadline: '',
                startDate: '',
                addedDate: '',
                todoListId: 'todolistId1',
                entityStatus: 'idle'
            },
            {
                id: '2',
                title: 'REDUX',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                description: '',
                order: 0,
                deadline: '',
                startDate: '',
                addedDate: '',
                todoListId: 'todolistId1',
                entityStatus: 'idle'
            }
        ]
    })

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(3)
    expect(endState['todolistId3'].length).toBe(2)
    expect(endState['todolistId3'][0].title).toBe('REACT')
    expect(endState['todolistId3'][1].title).toBe('REDUX')
});

test('status of specifier task should be changed', () => {
    const newStatus: RequestStatusType = 'loading'
    const action = changeTasksStatusAC({todolistId: 'todolistId2', taskId: '2', status: newStatus});

    const endState = tasksReducer(startState, action);

    expect(endState['todolistId2'][1].entityStatus).toBe(newStatus);
    expect(endState['todolistId1'][1].entityStatus).toBe('idle');
});
