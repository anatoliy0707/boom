import {ChangeEvent, useState} from "react";

export type EditableSpanPropsType = {
    value: string
    onChange: (title: string) => void
}

export const EditableSpan = ({ value, onChange }: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(value)

    const activateEditModeHandler = () => {
        setEditMode(true)
    }

    const deactivateEditModeHandler = () => {
        setEditMode(false)
        onChange(title)
    }

    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return (
        <>
            {editMode ? (
                <input value={title} onBlur={deactivateEditModeHandler} autoFocus onChange={changeTitleHandler}/>
            ) : (
                <span onDoubleClick={activateEditModeHandler}>{value}</span>
            )}
        </>
    )
}