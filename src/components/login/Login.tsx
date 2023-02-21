import React from 'react';
import { FormikHelpers, useFormik } from 'formik';
import * as Yup from 'yup';
import style from './Login.module.css'
import {
    Button,
    FormControl,
    IconButton, InputAdornment,
    InputLabel, LinearProgress,
    OutlinedInput,
    TextField
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchLoginTC } from '../../reducers/loginReducer/Login';
import { Navigate } from 'react-router-dom';
import { Paths } from '../../common/paths/Paths';



interface State {
    amount: string;
    password: string;
    weight: string;
    weightRange: string;
    showPassword: boolean;
}

interface InitialValuesType {
    email: string
    password: string
}

export const LoginPage = () => {

    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const isAuth = useAppSelector(state => state.login.isAuth)

    const [values, setValues] = React.useState<State>({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });


    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email('invalid email address').required('required'),
            password: Yup.string().min(7, 'must be 7 characters long')
                .matches(/[0-9]/, 'requires a number')
                .required('required')
        }),
        onSubmit: (values: InitialValuesType, { setSubmitting, setStatus }: FormikHelpers<InitialValuesType>) => {
            dispatch(fetchLoginTC(values))
        }
    })

    if (isAuth) {
        return <Navigate to={Paths.main} />
    }

    return (
        <div className={style.all_wrapper_login}>
            <div className={style.wrapper_login}>
                {status === 'loading' && <div className="loading"><LinearProgress color="primary" /></div>}
                <div className={style.sing_in}>Sing in</div>
                <div className={style.form_container}>
                    <form className={style.gm}>
                        <div className={style.item_box}>
                            <TextField
                                id="outlined-basic"
                                name="email"
                                label="email"
                                type="email"
                                fullWidth={true}
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                color={formik.touched.email && formik.errors.email ? 'error' : 'success'}
                                variant="outlined" />
                            {formik.touched.email && formik.errors.email ? (
                                <div className={style.validation}>{formik.errors.email}</div>
                            ) : null}
                        </div>

                        <div className={style.item_box}>
                            <FormControl variant="outlined" fullWidth={true}>
                                <InputLabel htmlFor="outlined-adornment-password"
                                    color={formik.touched.password && formik.errors.password ? 'error' : 'success'}
                                >Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={formik.values.password}
                                    name="password"
                                    onChange={formik.handleChange}
                                    label="Password"
                                    color={formik.touched.password && formik.errors.password ? 'error' : 'success'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            {formik.touched.password && formik.errors.password ? (
                                <div className={style.validation}>{formik.errors.password}</div>
                            ) : null}
                        </div>
                    </form>
                    <form onSubmit={formik.handleSubmit} className={style.form}>
                        <div className={style.item_box}>
                            <Button className={style.button} variant="outlined" type="submit">LOGIN</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
