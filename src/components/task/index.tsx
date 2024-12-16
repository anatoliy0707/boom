import React, {ChangeEvent} from "react";
import {EditableSpan} from "../editable-span";
import {Button} from "../button";
import styles from './index.module.css'

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
    date?: string;
}

export type TaskProps = TaskType & {
    removeTask: (taskId: string, todolistId: string) => void;
    updateTask: (taskId: string, todolistId: string, title: string) => void;
    changeTaskStatus: (taskStatus: boolean, taskID: string, todolistID: string) => void;
    todolistId: string;
}

export const Task = ({title, id, isDone, changeTaskStatus, updateTask, removeTask, todolistId}: TaskProps) => {

    const removeTaskHandler = () => {
        removeTask(id, todolistId)
    }
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        changeTaskStatus(newStatusValue, id, todolistId)
    }

    const changeTaskTitleHandler = (title: string) => {
        updateTask(id, todolistId, title)
    }
    return <li key={id} className={isDone ? styles.isDone : ""}>
        <input type="checkbox" checked={isDone} onChange={changeTaskStatusHandler}/>
        <EditableSpan value={title} onChange={changeTaskTitleHandler}/>
        <Button title={"x"} onClick={removeTaskHandler}/>
    </li>
}