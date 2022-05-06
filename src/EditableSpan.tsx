import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

export type EditableSpanPropsType = {
    title: string
    onChange: (newTitle: string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {

    let [title, setTitle] = useState<string>('')
    let [editMode, setEditMode] = useState<boolean>(false)

    const activeEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activeViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressEnter = (e: KeyboardEvent<HTMLInputElement>) =>
        e.key === 'Enter' && activeViewMode()


    return editMode ?
        <input autoFocus
               value={title}
               onBlur={activeViewMode}
               onKeyPress={onKeyPressEnter}
               onChange={onChangeTitleHandler}/> :
        <span onDoubleClick={activeEditMode}>{props.title}</span>
}