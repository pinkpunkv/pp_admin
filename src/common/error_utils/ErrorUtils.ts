import axios, { AxiosError } from "axios";
import { Dispatch } from "redux";
import { setErrorApp } from "../../reducers/appReducer/AppReducer";

export const handleError = (err: Error | AxiosError, dispatch: Dispatch) => {
    if (axios.isAxiosError(err)) {
        const error = err.response?.data ? (err.response.data as { error: string }).error : err.message
        dispatch(setErrorApp({ error }))
    } else {
        dispatch(setErrorApp({
            error: `Native error ${err.message}`
        }))
    }
}