import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import s from './TableProducts.module.scss'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { IconButton } from '@mui/material';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { deleteProduct } from '../../../../reducers/adminPanel/AdminPanel';



export const TableProducts = () => {

    const products_data = useAppSelector(state => state.admin_panel.content)
    const dispatch = useAppDispatch()

    const removeProduct = (product_id: number) => {
        dispatch(deleteProduct(product_id))
    }



    const createData = (
        id: number,
        name: string,
        price: string,
        active: boolean,
        sex: string,
    ) => {
        return { id, name, price, active, sex };
    }

    const rows = products_data.map(prod => createData(prod.id, prod.slug, prod.price, prod.active, prod.sex))
    return (
        <div className={s.table_wrapper}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead >
                        <TableRow className={s.table_head}>
                            <TableCell>Product Id</TableCell>
                            <TableCell>Product Name</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Active</TableCell>
                            <TableCell align="right">Sex</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.price} byn </TableCell>
                                <TableCell align="right">{row.active ? "active" : "no active"}</TableCell>
                                <TableCell align="right">{row.sex}</TableCell>
                                <TableCell align="right" sx={{ width: 100 }}>
                                    <IconButton
                                        size="small">
                                        <DeleteForeverOutlinedIcon
                                            color={'primary'}
                                            onClick={() => removeProduct(row.id)}
                                        />
                                    </IconButton>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}