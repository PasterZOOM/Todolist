import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField, Tooltip} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

type AddItemFormsPropsType = {
    itemTitle: string
    addItem: (title: string) => void
}

export const AddItemForms = (props: AddItemFormsPropsType) => {

    const [error, setError] = useState<string | null>(null)
    const [newItemTitle, setNewItemTitle] = useState<string>('')

    const addTask = () => {
        if (newItemTitle.trim() !== '') {
            props.addItem(newItemTitle.trim())
            setNewItemTitle('')
        } else setError('Error')
    }
    const onClickButtonHandler = () => {
        addTask()
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewItemTitle(e.currentTarget.value)
    }
    const onKeyPressInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        e.key === 'Enter' && addTask()
    }

    return <div>
        <TextField
            value={newItemTitle}
            onChange={onChangeInputHandler}
            onKeyPress={onKeyPressInputHandler}
            id={error ? 'outlined-error-helper-text' : 'outlined-basic'}
            label={`Enter ${props.itemTitle} name`}
            variant="outlined"
            error={!!error}
            helperText={error && `Invalid ${props.itemTitle} name`}
            size={'small'}
        />
        <Tooltip title={`Add ${props.itemTitle}`}>
            <IconButton onClick={onClickButtonHandler} aria-label="delete" size="medium">
                <AddIcon/>
            </IconButton>
        </Tooltip>
    </div>

}