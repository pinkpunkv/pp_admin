import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductsAPI, ProductsData } from "../../api/products_data_api/ProductsAPI";
import { setStatusApp } from '../appReducer/AppReducer';
import { AxiosError } from 'axios';
import { handleError } from '../../common/error_utils/ErrorUtils';

export type initialStateType = ProductsData

const initialState: initialStateType = {
    content: [{
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
        fields: {
            fieldName: '',
            fieldValue: '',
            id: 0,
            languageId: 0
        },
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
    }],
    message: '',
    status: 0
}

export const fetchAdminData = createAsyncThunk('AdminPanelReducer/fetchAdminData', async (param, thunkAPI) => {
    thunkAPI.dispatch(setStatusApp({ status: 'loading' }))
    try {
        const res_admin_data = await ProductsAPI.getProducts()
        thunkAPI.dispatch(getAdminData({ data: res_admin_data }))
        thunkAPI.dispatch(setStatusApp({ status: 'succeeded' }))
    }
    catch (e) {
        const err = e as Error | AxiosError
        handleError(err, thunkAPI.dispatch)
        thunkAPI.dispatch(setStatusApp({ status: 'failed' }))
    }

})

const slice = createSlice({
    name: 'AdminPanelReducer',
    initialState,
    reducers: {
        getAdminData(state, action: PayloadAction<{ data: ProductsData }>) {
            state.content = action.payload.data.content
        }
    }
})

export const AdminPanelReducer = slice.reducer
export const { getAdminData } = slice.actions

export type AdminPanelActionsType = getAdminDataType
type getAdminDataType = ReturnType<typeof getAdminData>



