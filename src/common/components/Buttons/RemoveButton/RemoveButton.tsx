import React from 'react'
import {IconButton, Tooltip} from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'

type PropsType = {
    tooltip: string
    onClick: () => void
    disabled?: boolean
}

export const RemoveButton: React.FC<PropsType> = React.memo(({tooltip, onClick, disabled}) => (
    <Tooltip title={tooltip}>
        <IconButton onClick={onClick} aria-label="delete" size="small" disabled={disabled}>
            <ClearIcon fontSize="inherit"/>
        </IconButton>
    </Tooltip>
))