import React from 'react';
import s from './FilterProducts.module.scss'
import { SearchProduct } from './search/SearchProduct';
import { SortCost } from './sort_cost/SortCost';
import { AvailabilityOfProducts } from './availability/AvailabilityOfProducts';
import { SortSize } from './sortSize/SortSize';

export const FilterProducts = () => {
    return (
        <div className={s.filter_prod_wrapper}>
            <SearchProduct />
            <SortCost />
            <AvailabilityOfProducts />
            <SortSize />
        </div>

    );
}