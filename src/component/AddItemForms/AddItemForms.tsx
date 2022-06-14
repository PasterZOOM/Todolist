import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {IconButton, TextField, Tooltip} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

type AddItemFormsPropsType = {
    itemTitle: string
    addItem: (title: string) => void
}

export const AddItemForms: React.FC<AddItemFormsPropsType> = React.memo(({itemTitle, addItem}) => {

    const [error, setError] = useState<string | null>(null)
    const [newItemTitle, setNewItemTitle] = useState<string>('')

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewItemTitle(e.currentTarget.value)
    }
    const addItemValue = useCallback(() => {
        if (newItemTitle.trim() !== '') {
            addItem(newItemTitle.trim())
            setNewItemTitle('')
        } else setError('Error')
    }, [addItem, newItemTitle])
    const onKeyPressInputHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        error !== null && setError(null)
        e.key === 'Enter' && addItemValue()
    }, [error, addItemValue])

    return <div>
        <TextField
            value={newItemTitle}
            onChange={onChangeInputHandler}
            onKeyDown={onKeyPressInputHandler}
            id={error ? 'outlined-error-helper-text' : 'outlined-basic'}
            label={`Enter ${itemTitle} name`}
            variant="outlined"
            error={!!error}
            helperText={error && `Invalid ${itemTitle} name`}
            size={'small'}/>
        <Tooltip title={`Add ${itemTitle}`}>
            <IconButton onClick={addItemValue} aria-label="delete" size="medium">
                <AddIcon/>
            </IconButton>
        </Tooltip>
    </div>

})