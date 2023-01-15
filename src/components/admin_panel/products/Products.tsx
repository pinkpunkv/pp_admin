import React from 'react';
import { AddProduct } from './addProduct/AddProduct';
import s from './Products.module.scss'
import { FilterProducts } from './filter_products/FilterProducts';
import { TableProducts } from './table_products/TableProducts';

export const Products = () => {
    return (
        <div className={s.products_wrapper}>
            <AddProduct />
            <FilterProducts />
            <TableProducts />
        </div>

    );
}