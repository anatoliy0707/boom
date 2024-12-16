import {Button} from "../button";
import styles from './index.module.css'

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TaskFilterProps = {
    filter: FilterValuesType
    onFilterChange: (filterValues: FilterValuesType) => void
}

export const TaskFilter = ({filter, onFilterChange}: TaskFilterProps) => {

    return <div>
        <Button className={filter === 'all' ? styles.activeFilter : ''} title={"All"} onClick={() => {
            onFilterChange("all")
        }}/>
        <Button className={filter === 'active' ? styles.activeFilter : ''} title={"Active"}
                onClick={() => {
                    onFilterChange("active")
                }}/>
        <Button className={filter === 'completed' ? styles.activeFilter : ''} title={"Completed"}
                onClick={() => {
                    onFilterChange("completed")
                }}/>
    </div>
}