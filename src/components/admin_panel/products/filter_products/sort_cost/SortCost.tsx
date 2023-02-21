import React, { useEffect } from 'react';
import s from './SortCost.module.scss'
import { useSearchParams } from 'react-router-dom';
import useDebounce from '../../../../../hooks/hooks';
import { Box, Slider } from '@mui/material';

const valuetext = (value: number) => {
    return `${value}°C`;
}

export const SortCost = () => {

    const maxCostCount = 500

    //const dispatch = useAppDispatch()
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQueryName = searchParams.get('search') || '';
    const searchQueryMin = searchParams.get('min') || '';
    const searchQueryMax = searchParams.get('max') || '';
    const sortSize = searchParams.get('size') || '';
    const searchAvalibleProducts = searchParams.get('avalible') || '';

    const max_value = Number(searchQueryMax) ? Number(searchQueryMax) : maxCostCount
    const [value, setValue] = React.useState<number[]>([Number(searchQueryMin), Number(searchQueryMax)]);
    const debounceValue = useDebounce<number[]>(value, 700);

    useEffect(() => {
        //for redux
    }, [debounceValue])

    const handleChange = (event: React.SyntheticEvent | Event, newValue: number | number[]) => {
        let [min_val, max_val] = newValue as number[]

        const params = {
            search: searchQueryName,
            size: sortSize,
            min: min_val.toString(),
            max: '',
            avalible: searchAvalibleProducts
        }
        max_val === 0 ? params.max = maxCostCount.toString() : params.max = max_val.toString()
        setSearchParams(params)
        setValue(newValue as number[]);
    };


    return (
        <div className={s.all_wrapper_filter_range}>
            <div className={s.title_filter_range}>
                Price:
            </div>
            <div className={s.slider_wrapper}>
                <span className={s.count_value_wrapper}>{Number(searchQueryMin)} byn</span>
                <Box sx={{ width: 100 }}>
                    <Slider
                        value={[Number(searchQueryMin), max_value]}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        max={maxCostCount}
                        step={1}
                    />
                </Box>
                <span className={s.count_value_wrapper_right}>{max_value} byn</span>
            </div>

        </div>
    );
}