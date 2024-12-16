import React, {useEffect, useState} from 'react';
import './App.css';
import {Todolist} from "./components/todolist";
import {v1} from 'uuid'
import {AddItemInput} from "./components/add-item-input";
import {TASKS, TODOLISTS} from "./constants";
import {FilterValuesType} from "./components/task-filter";
import {TaskType} from "./components/task";

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {

    let [todolists, setTodolists] = useState<TodolistType[]>(() => {
        const savedTodolists = localStorage.getItem(TODOLISTS);
        return savedTodolists ? JSON.parse(savedTodolists) : [];
    })

    let [tasks, setTasks] = useState<TasksStateType>(() => {
        const savedTasks = localStorage.getItem(TASKS);
        return savedTasks ? JSON.parse(savedTasks) : {};
    })

    const removeTask = (taskID: string, todolistID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter((task) => task.id !== taskID)})
    }

    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        setTodolists(todolists.map(todolist => (todolist.id === todolistId ? {...todolist, filter} : todolist)))
    }

    const addTask = (title: string, todolistID: string) => {
        setTasks({...tasks, [todolistID]: [{id: v1(), title, isDone: false}, ...tasks[todolistID]]})
    }

    const changeTaskStatus = (taskStatus: boolean, taskID: string, todolistID: string) => {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(task => (task.id === taskID ? {...task, isDone: taskStatus} : task))
        })
    }

    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistID))
        delete tasks[todolistID]
        setTasks({...tasks})
    }

    const addTodolist = (title: string) => {
        const todolistID = v1()
        const newTodolist: TodolistType = {id: todolistID, title: title, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [todolistID]: []})
    }

    const updateTask = (taskID: string, todolistID: string, title: string) => {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(task => (task.id === taskID ? {...task, title} : task)),
        })
    }

    const updateTodolist = (todolistID: string, title: string) => {
        setTodolists(todolists.map(tl => (tl.id === todolistID ? {...tl, title} : tl)))
    }

    useEffect(() => {
        localStorage.setItem(TODOLISTS, JSON.stringify(todolists));
    }, [todolists]);

    useEffect(() => {
        localStorage.setItem(TASKS, JSON.stringify(tasks));
    }, [tasks]);

    return (
        <div className="App">
            Add Todolist
            <AddItemInput addItem={addTodolist}/>
            {
                todolists.map((todolist) => {

                    let tasksForTodolist = tasks[todolist.id]
                    if (todolist.filter === 'active') {
                        tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
                    }

                    if (todolist.filter === 'completed') {
                        tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
                    }

                    return <Todolist
                        key={todolist.id}
                        id={todolist.id}
                        title={todolist.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={todolist.filter}
                        removeTodolist={removeTodolist}
                        updateTask={updateTask}
                        updateTodolist={updateTodolist}
                    />
                })
            }

        </div>
    );
}

export default App;
