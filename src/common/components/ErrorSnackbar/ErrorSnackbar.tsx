import React from 'react'
import MuiAlert, {AlertProps} from '@mui/material/Alert'
import {useActions, useAppSelector} from 'common/hooks/hooks'
import Snackbar from '@mui/material/Snackbar'
import {appActions} from 'features/CommonActions/App'
import { getError } from 'features/Application/applicationSelectors'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export const ErrorSnackbar = () => {
    const error = useAppSelector(getError)
    const {setAppError} = useActions(appActions)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        setAppError(null)
    }
    return (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    )
}
