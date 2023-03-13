import axios, { AxiosError } from "axios";
import { Dispatch } from "redux";
import { setErrorApp } from "../../reducers/appReducer/AppReducer";

export const handleError = (err: Error | AxiosError, dispatch: Dispatch) => {
    debugger
    if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.message : err.message

        console.log(error);

        dispatch(setErrorApp({ error }))
    } else {
        dispatch(setErrorApp({
            error: `Native error ${err.message}`
        }))
    }
}