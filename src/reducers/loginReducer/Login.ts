import { AxiosError } from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginAPI, LoginDataType, responceLoginType } from '../../api/products_data_api/LoginApi';
import { setStatusApp } from '../appReducer/AppReducer';
import { handleError } from '../../common/error_utils/ErrorUtils';
import { setToLocalStorage } from '../../common/localStorage/LocalStorage';


export type initialStateType = responceLoginType & DataForLogin & LoginDataType
type DataForLogin = {
    isAuth: boolean
}

const initialState: initialStateType = {
    content: {
        access_token: '',
        refresh_token: ''
    },
    email: '',
    password: '',
    isAuth: false,
    message: '',
    status: 0
}

export const fetchLoginTC = createAsyncThunk('LoginReducer/fetchLoginTC', async (param: LoginDataType, thunkAPI) => {
    thunkAPI.dispatch(setStatusApp({ status: 'loading' }))
    try {
        const login_all_data = await LoginAPI.login(param)
        setToLocalStorage('Authorization', login_all_data.access_token)
        thunkAPI.dispatch(setLogin({
            access_token: login_all_data.access_token,
            refresh_token: login_all_data.refresh_token,
            isAuth: true, email: param.email, password: param.password
        }))
        thunkAPI.dispatch(setStatusApp({ status: 'succeeded' }))
    }
    catch (e) {
        const err = e as Error | AxiosError
        handleError(err, thunkAPI.dispatch)
        thunkAPI.dispatch(setStatusApp({ status: 'failed' }))
    }

})

const slice = createSlice(
    {
        name: 'LoginReducer',
        initialState: initialState,
        reducers: {
            setLogin(state, action: PayloadAction<{ refresh_token: string, access_token: string, isAuth: boolean, email: string, password: string }>) {
                state.isAuth = action.payload.isAuth
                state.email = action.payload.email
                state.password = action.payload.password
                state.content.access_token = action.payload.access_token
                state.content.refresh_token = action.payload.refresh_token
            }
        }
    }
)
export const LoginReducer = slice.reducer
export const { setLogin } = slice.actions

export type ActionsLoginType = LoginACType
export type LoginACType = ReturnType<typeof setLogin>




