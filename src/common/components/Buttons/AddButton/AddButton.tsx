import React from 'react'
import {IconButton, Tooltip} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

type PropsType = {
    itemTitle: string
    addItemValue: () => void
}

export const AddButton: React.FC<PropsType> = React.memo(({itemTitle, addItemValue}) => (
    <Tooltip title={`Add ${itemTitle}`}>
        <IconButton onClick={addItemValue} aria-label="delete" size="medium">
            <AddIcon/>
        </IconButton>
    </Tooltip>
))