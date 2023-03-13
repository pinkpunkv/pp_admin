import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AppReducer, appReducersType } from "./appReducer/AppReducer";
import { AdminPanelActionsType, AdminPanelReducer } from "./adminPanel/AdminPanel";
import { ImagesDataReducer, ImagesActionType } from "../reducers/imagesData/ImagesData"
import { ActionsLoginType, LoginReducer } from "./loginReducer/Login";
import { CategoryActionsType, CategoryReducer } from "./categoryReducer/CategoryReducer";
import { ProductActions, ProductReducer } from "./productReducer/ProductReducer";

const rootReducers = combineReducers({
    app: AppReducer,
    admin_panel: AdminPanelReducer,
    images: ImagesDataReducer,
    login: LoginReducer,
    categories: CategoryReducer,
    product: ProductReducer
}
)

export const store = configureStore({
    reducer: rootReducers,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

export type AppRootStateType = ReturnType<typeof rootReducers>
export type AllAppActionsType = appReducersType | AdminPanelActionsType | ImagesActionType | ActionsLoginType | CategoryActionsType | ProductActions
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AllAppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AllAppActionsType>

// @ts-ignore
window.store = store