import React from 'react';
import { ProductsAPI } from '../../api/products_data_api/ProductsAPI';

const asyncFunc = async () => {
    const data = await ProductsAPI.getProducts()
    console.log(data);
}
asyncFunc()


export const AdminPanel = () => {


    return (
        <div>
            hello hi
        </div>

    );
}