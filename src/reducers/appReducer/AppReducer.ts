
import { Dispatch } from 'redux';
import { AxiosError } from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { handleError } from '../../common/error_utils/ErrorUtils';


export type requestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type appInitialStateType = {
    status: requestStatusType
    error: string | null
    initialized: boolean
}
const InitialState: appInitialStateType = {
    status: 'idle',
    error: null,
    initialized: true
}

const slice = createSlice({
    name: 'app',
    initialState: InitialState,
    reducers: {
        setErrorApp(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setStatusApp(state, action: PayloadAction<{ status: requestStatusType }>) {
            state.status = action.payload.status
        },
        initializedAppAC(status, action: PayloadAction) {
            status.initialized = false
        }
    }
})
export const AppReducer = slice.reducer
export const { setErrorApp, setStatusApp, initializedAppAC } = slice.actions

export type appReducersType = setErrorType | setStatusType | initializedAppType
type setErrorType = ReturnType<typeof setErrorApp>
type setStatusType = ReturnType<typeof setStatusApp>
type initializedAppType = ReturnType<typeof initializedAppAC>


export const initializedAppTC = (): AppThunk =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(initializedAppAC())
            dispatch(setErrorApp({ error: null }))
        } catch (e) {
            const err = e as Error | AxiosError
            handleError(err, dispatch)
        }

    }