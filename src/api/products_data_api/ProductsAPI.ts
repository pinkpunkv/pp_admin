import { instance } from './../api';

export const ProductsAPI = {
    getProducts() {
        return instance.get('admin/product')
    }
}