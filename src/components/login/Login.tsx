import React from 'react';
import { FormikHelpers, useFormik } from 'formik';
import * as Yup from 'yup';
import style from './Login.module.css'
import {
    Button,
    FormControl,
    FormControlLabel, IconButton, InputAdornment,
    InputLabel, LinearProgress,
    OutlinedInput,
    styled,
    Switch,
    SwitchProps,
    TextField
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';



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
    rememberMe: boolean
}

export const LoginPage = () => {



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
            password: '',
            rememberMe: false
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email('invalid email address').required('required'),
            password: Yup.string().min(7, 'must be 7 characters long')
                .matches(/[0-9]/, 'requires a number')
                .required('required')
        }),
        onSubmit: (values: InitialValuesType, { setSubmitting, setStatus }: FormikHelpers<InitialValuesType>) => {
            alert(JSON.stringify(values))
        }
    })
    let status = "success"; // заглушка 
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
                        <div className={style.item_box}>
                            <FormControlLabel
                                control={<IOSSwitch sx={{ mx: 2 }} />}
                                name="rememberMe"
                                onChange={() => {
                                    formik.setFieldValue('rememberMe', !formik.values.rememberMe)
                                }}
                                label="Remember me"
                            />
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


const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));