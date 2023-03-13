import { ProductsAPI } from './../../api/products_data_api/ProductsAPI';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContentObj } from "../../api/products_data_api/ProductsAPI";
import { setStatusApp } from '../appReducer/AppReducer';
import { AxiosError } from 'axios';
import { handleError } from '../../common/error_utils/ErrorUtils';


export type initialProductType = {
    content: ContentObj
}
const initialState: initialProductType = {
    content: {
        active: false,
        categories: [],
        collection: {
            id: 0,
            fields: []
        },
        collectionId: null,
        currency: {
            imageId: null,
            symbol: "BYN"
        },
        currencySymbol: "BYN",
        fields: [{
            fieldName: '',
            fieldValue: '',
            id: 0,
            languageId: 0
        }],
        id: 0,
        images: [
            {
                image: {
                    id: 0,
                    url: ''
                },
                imageId: 0,
                isMain: false,
                number: 0,
                productId: 0
            }],
        price: '',
        sex: '',
        slug: '',
        tags: [],
        variants: [
            {
                color: '',
                count: 0,
                id: 0,
                productId: 0,
                size: ''
            }
        ],
    }
}

export const getProductData = createAsyncThunk('ProductReducer/getProductData', async (product_id: number, thunkAPI) => {
    thunkAPI.dispatch(setStatusApp({ status: 'loading' }))
    try {
        const product_data_api = await ProductsAPI.getProduct(product_id)
        thunkAPI.dispatch(setProductData({ product_data: product_data_api.content }))
        thunkAPI.dispatch(setStatusApp({ status: 'succeeded' }))
    }
    catch (e) {
        const err = e as Error | AxiosError
        handleError(err, thunkAPI.dispatch)
        thunkAPI.dispatch(setStatusApp({ status: 'failed' }))
    }
})

export const updateProductData = createAsyncThunk('ProductReducer/updateProductData', async (product_info_for_update: ContentObj, thunkAPI) => {
    thunkAPI.dispatch(setStatusApp({ status: 'loading' }))
    try {
        const update_product_data_api = await ProductsAPI.updateProduct(product_info_for_update)
        thunkAPI.dispatch(updateProductData(update_product_data_api.content))
        thunkAPI.dispatch(setStatusApp({ status: 'succeeded' }))
    }
    catch (e) {
        const err = e as Error | AxiosError
        handleError(err, thunkAPI.dispatch)
        thunkAPI.dispatch(setStatusApp({ status: 'failed' }))
    }
})

const slice = createSlice({
    name: 'ProductReducer',
    initialState,
    reducers: {
        setProductData(state, action: PayloadAction<{ product_data: ContentObj }>) {
            state.content = action.payload.product_data
        },
        updateProductData(state, action: PayloadAction<{ update_product_data: ContentObj }>) {
            state.content = action.payload.update_product_data
        }

    }
})

export const ProductReducer = slice.reducer
export const { setProductData } = slice.actions

export type ProductActions = setProductDataType
type setProductDataType = ReturnType<typeof setProductData>