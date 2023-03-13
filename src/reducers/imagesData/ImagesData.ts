import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { imagesResponce } from "../../api/products_data_api/ProductsAPI";
import { setStatusApp } from "../appReducer/AppReducer"
import { handleError } from '../../common/error_utils/ErrorUtils';
import { AxiosError } from 'axios';
import { ImagesAPI } from "../../api/products_data_api/ProductsAPI";

export type initialStateType = imagesResponce

const initialState: initialStateType = {
    content: [],
    message: '',
    status: 0
}

export const fetchImagesData = createAsyncThunk('ImagesDataReducer/getImages', async (param, thunkAPI) => {
    thunkAPI.dispatch(setStatusApp({ status: 'loading' }))
    try {
        const res_images_data = await ImagesAPI.getImagesData()
        thunkAPI.dispatch(getImages({ imagesData: res_images_data }))
        thunkAPI.dispatch(setStatusApp({ status: 'succeeded' }))
    }
    catch (e) {
        const err = e as Error | AxiosError
        handleError(err, thunkAPI.dispatch)
        thunkAPI.dispatch(setStatusApp({ status: 'failed' }))
    }

})

const slice = createSlice({
    name: 'ImagesDataReducer',
    initialState,
    reducers: {
        getImages(state, action: PayloadAction<{ imagesData: imagesResponce }>) {
            state.content = action.payload.imagesData.content
            state.message = action.payload.imagesData.message
            state.status = action.payload.imagesData.status
        }
    }
}
)

export const ImagesDataReducer = slice.reducer
export const { getImages } = slice.actions


export type ImagesActionType = getImagesType
type getImagesType = ReturnType<typeof getImages>