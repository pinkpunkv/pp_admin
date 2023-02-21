import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useSearchParams } from 'react-router-dom';

export const SortSize = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const sortSize = searchParams.get('size') || '';
    const searchAvalibleProducts = searchParams.get('avalible') || '';
    const searchQueryName = searchParams.get('search') || '';
    const searchQueryMin = searchParams.get('min') || '';
    const searchQueryMax = searchParams.get('max') || '';

    const handleChange = (event: SelectChangeEvent) => {

        const choise_size = event.target.value
        const params = {
            search: searchQueryName,
            size: choise_size,
            min: searchQueryMin,
            max: searchQueryMax,
            avalible: searchAvalibleProducts
        }
        setSearchParams(params)
    };

    React.useEffect(() => {
        // we should give (searchAvalibleProducts) for redux
    }, [searchAvalibleProducts])

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 100 }}>
                <InputLabel id="demo-simple-select-helper-label">Size:</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={sortSize}
                    label="Size"
                    onChange={handleChange}
                >
                    <MenuItem value={'s'}>s</MenuItem>
                    <MenuItem value={'m'}>m</MenuItem>
                    <MenuItem value={'l'}>l</MenuItem>
                    <MenuItem value={'xl'}>xl</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}