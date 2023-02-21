import React, { ChangeEvent, useEffect } from 'react';
import useDebounce from '../../../../../hooks/hooks';
import { useSearchParams } from 'react-router-dom';
import { Toolbar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import s from './SearchProduct.module.scss'
import { Search, SearchIconWrapper, StyledInputBase } from '../../../../../common/styles/styles_for_search';

export const SearchProduct = () => {

    //const dispatch = useAppDispatch()
    //const producs = useAppSelector(state => state.admin_panel.content)


    const [searchParams, setSearchParams] = useSearchParams();
    const searchQueryName = searchParams.get('search') || '';
    const sortSize = searchParams.get('size') || '';
    const searchAvalibleProducts = searchParams.get('avalible') || '';
    const searchQueryMin = searchParams.get('min') || '';
    const searchQueryMax = searchParams.get('max') || '';
    const debouncedValue = useDebounce<string>(searchQueryName, 700)


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const form = event.target;
        const query = form.value
        const params = {
            search: query,
            size: sortSize,
            min: searchQueryMin,
            max: searchQueryMax,
            avalible: searchAvalibleProducts
        }
        setSearchParams(params)
    }


    useEffect(() => {
        // we should give (debouncedValue) for redux
    }, [debouncedValue])

    return (
        <div className={s.all_wrapper_search_prod}>
            <div className={s.title_search_prod}>
                Search:
            </div>
            <Toolbar className={s.toolbar}>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="go search..."
                        className={s.search_input}
                        onChange={handleChange}
                        value={searchQueryName}
                    />
                </Search>
            </Toolbar>
        </div>
    );
}