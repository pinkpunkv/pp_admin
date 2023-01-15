import { Button } from '@mui/material';
import s from './AddProduct.module.scss'
import React from 'react';


export const AddProduct = () => {
    return (
        <div className={s.add_product_wrapper}>
            <div className={s.title_name}>Products</div>
            <div>
                <Button variant={'outlined'}>Add Product</Button>
            </div>
        </div>

    );
}