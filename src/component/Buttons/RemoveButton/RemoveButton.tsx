import React from 'react';
import {IconButton, Tooltip} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

export type RemoveButtonPropsType = {
    tooltip: string
    onClick: () => void
}

export const RemoveButton: React.FC<RemoveButtonPropsType> = React.memo(({tooltip, onClick}) => {
    return (
        <Tooltip title={tooltip}>
            <IconButton onClick={onClick} aria-label="delete" size="small">
                <ClearIcon fontSize="inherit"/>
            </IconButton>
        </Tooltip>
    )
})