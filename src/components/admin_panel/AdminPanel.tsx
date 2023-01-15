import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchAdminData } from '../../reducers/adminPanel/AdminPanel';
import { ThreeDots } from 'react-loader-spinner';
import s from './AdminPanel.module.scss'
import { Products } from './products/Products';





export const AdminPanel = () => {
    const dispatch = useAppDispatch()
    const admin_data = useAppSelector(state => state.admin_panel.content)
    const status = useAppSelector(state => state.app.status)
    console.log(admin_data)

    useEffect(() => {
        dispatch(fetchAdminData())
    }, [])

    if (status === 'loading') {
        return (
            <div className={s.loading_wrapper}>
                <ThreeDots
                    height="50"
                    width="50"
                    radius="3"
                    color="black"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    visible={true}
                />
            </div>

        )
    }
    return (
        <div className={s.admin_panel_wrapper}>
            <Products />
        </div>

    );
}