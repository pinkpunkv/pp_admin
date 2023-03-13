import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { CategoryAPI, CategoryObj } from "../../api/products_data_api/ProductsAPI"
import { setStatusApp } from "../appReducer/AppReducer"
import { AxiosError } from "axios"
import { handleError } from "../../common/error_utils/ErrorUtils"

export type initialCategoryStateType = {
    content: CategoryObj[]
}

const initialCategoryState: initialCategoryStateType = {
    content: []
}

export const getCategoriesData = createAsyncThunk('CategoryReducer/getCategoriesData', async (param, thunkAPI) => {
    thunkAPI.dispatch(setStatusApp({ status: 'loading' }))
    try {
        const res_categories_data = await CategoryAPI.getCategory()
        thunkAPI.dispatch(setProductsCategories({ data: res_categories_data.data.content }))
        thunkAPI.dispatch(setStatusApp({ status: 'succeeded' }))
    }
    catch (e) {
        const err = e as Error | AxiosError
        handleError(err, thunkAPI.dispatch)
        thunkAPI.dispatch(setStatusApp({ status: 'failed' }))
    }

})

const slice = createSlice({
    name: 'CategoryReducer',
    initialState: initialCategoryState,
    reducers: {
        setProductsCategories(state, action: PayloadAction<{ data: CategoryObj[] }>) {
            state.content = action.payload.data
        }
    }
})

export const CategoryReducer = slice.reducer
export const { setProductsCategories } = slice.actions

export type CategoryActionsType = setProductsCategoriestype
type setProductsCategoriestype = ReturnType<typeof setProductsCategories>