import { Button } from '@mui/material';
import s from './AddProduct.module.scss'
import React from 'react';
import { useNavigate } from 'react-router-dom';


export const AddProduct = () => {

    const navigate = useNavigate();

    return (
        <div className={s.add_product_wrapper}>
            <div className={s.title_name}>Products</div>
            <div>
                <Button variant={'outlined'} onClick={() => navigate('add_product')}>Add Product</Button>
            </div>
        </div>

    );
}