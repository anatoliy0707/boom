import {Task, TaskType} from "../task";

export type TaskListProps = {
    tasks: TaskType[];
    todolistId: string;
    removeTask: (taskId: string, todolistId: string) => void;
    updateTask: (taskId: string, todolistId: string, title: string) => void;
    changeTaskStatus: (taskStatus: boolean, taskID: string, todolistID: string) => void;
}

export const TaskList = ({
                             tasks,
                             removeTask,
                             todolistId,
                             changeTaskStatus,
                             updateTask
                         }: TaskListProps) => {
    return <ul>
        {tasks.map((task: TaskType) => {

            return <Task
                key={task.id}
                id={task.id}
                isDone={task.isDone}
                todolistId={todolistId}
                title={task.title}
                updateTask={updateTask}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
            />
        })}
    </ul>
}