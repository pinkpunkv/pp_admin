import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { FieldArray, FormikHelpers, Formik, Form } from 'formik';
import * as Yup from 'yup';
import style from './AddNewProduct.module.scss';
import { TextField, FormControlLabel, Button, FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material';
import { IOSSwitch } from '../../common/styles/themeForIOSUtil';
import { addProductObj } from '../../api/products_data_api/ProductsAPI'
import { fetchAdminData } from "../../reducers/imagesData/ImagesData"
import { ThreeDots } from 'react-loader-spinner';
import { AddSelectPhotoModal } from './AddSelectPhotoModal';
import { addProductData } from '../../reducers/adminPanel/AdminPanel';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../common/paths/Paths';





export const AddNewProduct = () => {

    const dispatch = useAppDispatch()
    const products_photo = useAppSelector(state => state.images.content)
    const status = useAppSelector(state => state.app.status)
    const navigate = useNavigate()


    useEffect(() => {
        dispatch(fetchAdminData())
    }, [])


    if (status === 'loading') {
        return (
            <div className={style.loading_wrapper}>
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
    const AddProductSchema = Yup.object().shape({
        slug: Yup.string().required("required").min(2, 'short slug').max(15, 'long slug'),
        price: Yup.number().required("required").min(1, 'price 0'),
        sex: Yup.string().required("choise sex"),
        currencySymbol: Yup.string().required("choise currency"),
        fields: Yup.array().of(
            Yup.object().shape({
                fieldValue: Yup.string().required('required')
            })
        )
    });

    const goBackhandleChange = () => {
        navigate(Paths.main)
    }

    return (
        <Formik
            initialValues={{
                slug: "",
                price: 0,
                active: false,
                sex: 'uni',
                collectionId: null,
                currencySymbol: "BYN",
                fields: [
                    {
                        fieldName: "name",
                        fieldValue: "",
                        languageId: 2
                    },
                    {
                        fieldName: "path",
                        fieldValue: "/",
                        languageId: 2
                    },
                    {
                        fieldName: "description",
                        fieldValue: "",
                        languageId: 2
                    },
                    {
                        fieldName: "name",
                        fieldValue: "",
                        languageId: 1
                    },
                    {
                        fieldName: "path",
                        fieldValue: "/",
                        languageId: 1
                    },
                    {
                        fieldName: "description",
                        fieldValue: "",
                        languageId: 1
                    }
                ],
                categories: [{ id: 1 }],
                images: [],
                tags: []
            }}
            validationSchema={AddProductSchema}
            onSubmit={(values: addProductObj, { setSubmitting, setStatus }: FormikHelpers<addProductObj>) => {
                dispatch(addProductData(values))
            }
            }
        >
            {(props) => {


                return (
                    <div className={style.all_wrapper}>
                        <div className={style.goBack}>
                            <IconButton onClick={goBackhandleChange}>
                                < ArrowBackOutlinedIcon color={'primary'} sx={{ fontSize: 40 }} />
                            </IconButton>
                        </div>

                        <Form className={style.form_wrapper} onSubmit={props.handleSubmit}>
                            <div className={style.title_for_form}> About add Product</div>
                            <div className={style.button_wrapper} >
                                <Button className={style.button_submit} variant="outlined" type="submit">ADD</Button>
                            </div>
                            <div className={style.first_form_wrapper}>
                                <div className={style.slug_wrapper}>
                                    <TextField
                                        id="outlined-basic"
                                        name="slug"
                                        label="Slug"
                                        type="text"
                                        fullWidth={true}
                                        onBlur={props.handleBlur}
                                        onChange={props.handleChange}
                                        value={props.values.slug}
                                        color={props.touched.slug && props.errors.slug ? 'error' : 'primary'}
                                        variant="outlined" />
                                    {props.touched.slug && props.errors.slug
                                        ? <div className={style.error_val}>
                                            {props.errors.slug}
                                        </div>
                                        : null}
                                </div>
                                <div className={style.price_wrapper}>
                                    <TextField
                                        id='price'
                                        name='price'
                                        type={"number"}
                                        label="Price"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        defaultValue={props.values.price}
                                        color={props.touched.price && props.errors.price ? 'error' : 'primary'}
                                    />
                                    {props.touched.price && props.errors.price
                                        ? <div className={style.error_val}>
                                            {props.errors.price}
                                        </div>
                                        : null}
                                </div>
                                <div className={style.collectionId_wrapper}>
                                    <TextField
                                        disabled={true}
                                        id='collectionId'
                                        name='collectionId'
                                        type={"number"}
                                        label="Id Collection"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        defaultValue={props.values.collectionId}
                                    />
                                </div>
                                <div className={style.sex_wrapper}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Sex</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id='sex'
                                            name='sex'
                                            value={props.values.sex}
                                            defaultValue={props.values.sex}
                                            label="Sex"
                                            onChange={props.handleChange}
                                            color={props.touched.sex && props.errors.sex ? 'error' : 'primary'}
                                        >
                                            <MenuItem value={'male'}>Male</MenuItem>
                                            <MenuItem value={'female'}>Female</MenuItem>
                                            <MenuItem value={'uni'}>Unisex</MenuItem>
                                        </Select>
                                        {props.touched.sex && props.errors.sex
                                            ? <div className={style.error_val}>
                                                {props.errors.sex}
                                            </div>
                                            : null}
                                    </FormControl>
                                </div>
                                <div className={style.currency_symbol_wrapper}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id='currencySymbol'
                                            name='currencySymbol'
                                            value={props.values.currencySymbol}
                                            label="Currency"
                                            onChange={props.handleChange}
                                        >
                                            <MenuItem value={'BYN'}>Br</MenuItem>
                                            <MenuItem value={'Dolar'}>$</MenuItem>
                                            <MenuItem value={'Euro'}>€</MenuItem>
                                            <MenuItem value={'RUB'}>₽</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className={style.categories_wrapper}>

                                    <FieldArray
                                        name='categories'
                                        render={arrayHelpers => (
                                            <div className={style.categories}>
                                                {props.values.categories.map((cat, index) => {
                                                    return (
                                                        <FormControl fullWidth key={index}>
                                                            <InputLabel id="demo-simple-select-label">Categories</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id='categories'
                                                                name={`categories.${index}.id`}
                                                                value={props.values.categories[index].id}
                                                                label="categories"
                                                                onChange={props.handleChange}
                                                                onBlur={props.handleBlur}
                                                                color={'primary'}
                                                            >
                                                                <MenuItem value={1}>t-shirts</MenuItem>
                                                                <MenuItem value={2}>coats</MenuItem>
                                                                <MenuItem value={3}>pants</MenuItem>
                                                                <MenuItem value={4}>jackets</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    )
                                                })}
                                            </div>
                                        )}
                                    />

                                </div>
                                <div className={style.active_wrapper}>
                                    <FormControlLabel
                                        control={<IOSSwitch sx={{ mx: 2 }} />}
                                        id='active'
                                        name="active"
                                        onChange={props.handleChange}
                                        label="active product"
                                    />
                                </div>
                            </div>

                            <div className={style.fields_wrapper}>
                                <div className={style.title_for_fields}>fields multilingual</div>

                                <FieldArray
                                    name="fields"
                                    render={arrayHelpers => (
                                        <div className={style.flex_container_for_fields}>
                                            <div className={style.english_fields}>
                                                {props.values.fields.map((field, index) => {
                                                    const valueForField = props.errors.fields && props.errors.fields[index]
                                                    const arrVal = valueForField && Object.values(valueForField)

                                                    return (
                                                        <div key={index}>
                                                            {props.values.fields[index].fieldName === 'name' &&
                                                                props.values.fields[index].languageId === 1 &&
                                                                <div className={style.fields_icon} >
                                                                    <TextField
                                                                        id='FieldValueName'
                                                                        name={`fields.${index}.fieldValue`}
                                                                        label='Name ENG'
                                                                        fullWidth={true}
                                                                        type={"text"}
                                                                        onChange={props.handleChange}
                                                                        onBlur={props.handleBlur}
                                                                        defaultValue={props.values.fields[index].fieldValue}
                                                                    />
                                                                    {(props.touched.fields && props.errors.fields)
                                                                        && (props.touched.fields[index] && props.errors.fields[index]) ?
                                                                        <div className={style.error_val}>
                                                                            {arrVal && arrVal[0]}
                                                                        </div>
                                                                        : null
                                                                    }
                                                                </div>}

                                                            {props.values.fields[index].fieldName === 'description' &&
                                                                props.values.fields[index].languageId === 1 &&
                                                                <div className={style.fields_icon}>
                                                                    <TextField
                                                                        id='FieldValueDescription'
                                                                        name={`fields.${index}.fieldValue`}
                                                                        label='Description ENG'
                                                                        fullWidth={true}
                                                                        type={"text"}
                                                                        onChange={props.handleChange}
                                                                        onBlur={props.handleBlur}
                                                                        defaultValue={props.values.fields[index].fieldValue}
                                                                    />
                                                                    {(props.touched.fields && props.errors.fields)
                                                                        && (props.touched.fields[index] && props.errors.fields[index]) ?
                                                                        <div className={style.error_val}>
                                                                            {arrVal && arrVal[0]}
                                                                        </div>
                                                                        : null
                                                                    }
                                                                </div>}

                                                            {props.values.fields[index].fieldName === 'path' &&
                                                                props.values.fields[index].languageId === 1 &&
                                                                <div className={style.fields_icon}>
                                                                    <TextField
                                                                        id='FieldValuePath'
                                                                        name={`fields.${index}.fieldValue`}
                                                                        label='Path ENG'
                                                                        fullWidth={true}
                                                                        type={"text"}
                                                                        onChange={props.handleChange}
                                                                        onBlur={props.handleBlur}
                                                                        defaultValue={props.values.fields[index].fieldValue}
                                                                    />
                                                                    {(props.touched.fields && props.errors.fields)
                                                                        && (props.touched.fields[index] && props.errors.fields[index]) ?
                                                                        <div className={style.error_val}>
                                                                            {arrVal && arrVal[0]}
                                                                        </div>
                                                                        : null
                                                                    }
                                                                </div>}
                                                        </div>
                                                    )
                                                }
                                                )}
                                            </div>
                                            <div className={style.russian_fields}>
                                                {props.values.fields.map((field, index) => {
                                                    const valueForField = props.errors.fields && props.errors.fields[index]
                                                    const arrVal = valueForField && Object.values(valueForField)
                                                    console.log(arrVal)
                                                    return (
                                                        <div key={index}>
                                                            {props.values.fields[index].fieldName === 'name' &&
                                                                props.values.fields[index].languageId === 2 &&
                                                                <div className={style.fields_icon}>
                                                                    <TextField
                                                                        id='FieldValueName'
                                                                        name={`fields.${index}.fieldValue`}
                                                                        label='Name RUS'
                                                                        fullWidth={true}
                                                                        type={"text"}
                                                                        onBlur={props.handleBlur}
                                                                        onChange={props.handleChange}
                                                                        defaultValue={props.values.fields[index].fieldValue}
                                                                    />
                                                                    {(props.touched.fields && props.errors.fields)
                                                                        && (props.touched.fields[index] && props.errors.fields[index]) ?
                                                                        <div className={style.error_val}>
                                                                            {arrVal && arrVal[0]}
                                                                        </div>
                                                                        : null
                                                                    }
                                                                </div>}
                                                            {props.values.fields[index].fieldName === 'description' &&
                                                                props.values.fields[index].languageId === 2 &&
                                                                <div className={style.fields_icon}>
                                                                    <TextField
                                                                        id='FieldValueDescription'
                                                                        name={`fields.${index}.fieldValue`}
                                                                        label='Description RUS'
                                                                        fullWidth={true}
                                                                        type={"text"}
                                                                        onBlur={props.handleBlur}
                                                                        onChange={props.handleChange}
                                                                        defaultValue={props.values.fields[index].fieldValue}
                                                                    />
                                                                    {(props.touched.fields && props.errors.fields)
                                                                        && (props.touched.fields[index] && props.errors.fields[index]) ?
                                                                        <div className={style.error_val}>
                                                                            {arrVal && arrVal[0]}
                                                                        </div>
                                                                        : null
                                                                    }
                                                                </div>}
                                                            {props.values.fields[index].fieldName === 'path' &&
                                                                props.values.fields[index].languageId === 2 &&
                                                                <div className={style.fields_icon}>
                                                                    <TextField
                                                                        id='FieldValuePath'
                                                                        name={`fields.${index}.fieldValue`}
                                                                        label='Path RUS'
                                                                        fullWidth={true}
                                                                        type={"text"}
                                                                        onBlur={props.handleBlur}
                                                                        onChange={props.handleChange}
                                                                        defaultValue={props.values.fields[index].fieldValue}
                                                                    />
                                                                    {(props.touched.fields && props.errors.fields)
                                                                        && (props.touched.fields[index] && props.errors.fields[index]) ?
                                                                        <div className={style.error_val}>
                                                                            {arrVal && arrVal[0]}
                                                                        </div>
                                                                        : null
                                                                    }
                                                                </div>}
                                                        </div>

                                                    )
                                                }
                                                )}
                                            </div>
                                        </div>
                                    )}
                                />
                            </div>
                            <FieldArray
                                name="images"
                                render={arrayHelpers => (
                                    <div className={style.product_photo_wrapper}>
                                        <div className={style.photo_title}>photo selection</div>
                                        <div className={style.flex_wrapper_photo}>
                                            {products_photo.map((ph, index) => {
                                                return (
                                                    <AddSelectPhotoModal
                                                        dataImages={props.values.images}
                                                        photoId={ph.id}
                                                        onChange={props.handleChange}
                                                        setFieldValue={props.setFieldValue}
                                                        index={index}
                                                        values={props.values}
                                                        key={index}
                                                    >
                                                        <div key={ph.id} className={style.prod_photo} >
                                                            <img src={`http://91.149.142.24:9000/storage${ph.url}`} alt="pink_punk_products" />
                                                        </div>
                                                    </AddSelectPhotoModal>

                                                )
                                            })}
                                        </div>
                                    </div>
                                )}
                            />
                        </Form>

                    </div>
                )
            }}
        </Formik>
    );
}