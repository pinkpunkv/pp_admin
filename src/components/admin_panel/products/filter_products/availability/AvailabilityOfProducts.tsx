import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useSearchParams } from 'react-router-dom';

export const AvailabilityOfProducts = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const searchAvalibleProducts = searchParams.get('avalible') || '';
    const searchQueryName = searchParams.get('search') || '';
    const searchQueryMin = searchParams.get('min') || '';
    const searchQueryMax = searchParams.get('max') || '';

    const handleChange = (event: SelectChangeEvent) => {

        const avalible_vallue = event.target.value
        const params = {
            search: searchQueryName,
            min: searchQueryMin,
            max: searchQueryMax,
            avalible: avalible_vallue
        }
        setSearchParams(params)
    };

    React.useEffect(() => {
        // we should give (searchAvalibleProducts) for redux
    }, [searchAvalibleProducts])

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-helper-label">Avalability of products</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={searchAvalibleProducts}
                    label="Avalability of products"
                    onChange={handleChange}
                >
                    <MenuItem value={'available'}>available</MenuItem>
                    <MenuItem value={'not available'}>not available</MenuItem>
                    <MenuItem value={'all products'}>all products</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}