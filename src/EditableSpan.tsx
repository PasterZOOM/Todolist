import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from '@mui/material';

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
        <TextField
            variant="standard"
            onBlur={activeViewMode}
            autoFocus
            value={title}
            onKeyPress={onKeyPressEnter}
            onChange={onChangeTitleHandler}
            size={'small'}
        />
        : <span onDoubleClick={activeEditMode}>{props.title}</span>
}