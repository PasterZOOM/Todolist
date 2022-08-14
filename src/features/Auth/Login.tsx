import React from 'react'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button/Button'
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel'
import {useFormik} from 'formik'
import Checkbox from '@mui/material/Checkbox'

import {Navigate} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from 'common/hooks/hooks'
import {loginTC} from 'features/Auth/authReducer'
import {FormikErrorType} from 'features/Auth/FormikErrorType'
import {getIsLoggedIn} from 'features/Auth/authSelectors'

export const Login = () => {
    const dispatch = useAppDispatch()

    const isLoggedIn = useAppSelector(getIsLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z\d._%+-]+@[A-Z\d.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 3) errors.password = 'Password must be more than 3 digits'
            return errors
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
    })

    if (isLoggedIn) return <Navigate to={'/'}/>

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <FormControl>
                <FormLabel>
                    <p>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                           target={'_blank'} rel="noreferrer"> here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </FormLabel>
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <TextField label="Email"
                                   margin="normal"
                                   {...formik.getFieldProps('email')}/>
                        {formik.touched.email && formik.errors.email &&
                            <div style={{color: 'red'}}>{formik.errors.email}</div>}
                        <TextField type="password"
                                   label="Password"
                                   margin="normal"
                                   {...formik.getFieldProps('password')}/>
                        {formik.touched.password && formik.errors.password &&
                            <div style={{color: 'red'}}>{formik.errors.password}</div>}
                        <FormControlLabel label={'Remember me'}
                                          control={<Checkbox/>}
                                          checked={formik.values.rememberMe}
                                          {...formik.getFieldProps('rememberMe')}/>
                        <Button type="submit"
                                variant="contained"
                                color="primary" fullWidth>
                            Login
                        </Button>
                    </FormGroup>
                </form>
            </FormControl>
        </Grid>
    </Grid>
}