import React from "react";
import {EditableSpan} from "../editable-span";
import {Button} from "../button";
import {TaskList} from "../task-list";
import {FilterValuesType, TaskFilter} from "../task-filter";
import {AddItemInput} from "../add-item-input";
import {TaskType} from "../task";

export type TodolistPropsType = {
    id: string
    title: string;
    tasks: TaskType[];
    removeTask: (taskId: string, todolistId: string) => void;
    changeFilter: (filter: FilterValuesType, todolistId: string) => void;
    addTask: (title: string, todolistId: string) => void;
    changeTaskStatus: (taskStatus: boolean, taskID: string, todolistID: string) => void;
    filter: FilterValuesType;
    removeTodolist: (todolistId: string) => void
    updateTask: (taskId: string, todolistId: string, title: string) => void;
    updateTodolist: (todolistId: string, title: string) => void
}

export const Todolist = ({
                             id,
                             title,
                             tasks,
                             removeTask,
                             changeFilter,
                             addTask,
                             changeTaskStatus,
                             filter,
                             removeTodolist,
                             updateTask,
                             updateTodolist
                         }: TodolistPropsType) => {


    const onFilterChangeHandler = (filter: FilterValuesType) => {
        changeFilter(filter, id)
    }
    const removeTodolistHandler = () => {
        removeTodolist(id)
    }

    const addTaskHandler = (title: string) => {
        addTask(title, id)
    }

    const updateTodolistHandler = (title: string) => {
        updateTodolist(id, title)
    }

    return <div>
        <h3>
            <EditableSpan value={title} onChange={updateTodolistHandler}/>
            <Button title={'x'} onClick={removeTodolistHandler}/>
        </h3>
        <AddItemInput addItem={addTaskHandler}/>
        {tasks.length
            ? <TaskList
                tasks={tasks}
                todolistId={id}
                removeTask={removeTask}
                updateTask={updateTask}
                changeTaskStatus={changeTaskStatus}/>
            : <p>Тасок нет</p>}
        <TaskFilter filter={filter} onFilterChange={onFilterChangeHandler}/>
    </div>
}