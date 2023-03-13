import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import s from './Product.module.scss'
import { Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { FieldArray, Form, Formik, FormikHelpers } from 'formik';
import { AddSelectPhotoModal } from '../../../add_new_product/AddSelectPhotoModal';
import { ContentObj } from '../../../../api/products_data_api/ProductsAPI';
import * as Yup from 'yup';
import { ErrorSnackbar } from '../../../../common/error_snack_bar/ErrorSnackBar';
import { IOSSwitch } from '../../../../common/styles/themeForIOSUtil';
import { fetchImagesData } from '../../../../reducers/imagesData/ImagesData';
import { getCategoriesData } from '../../../../reducers/categoryReducer/CategoryReducer';
import { updateProductData } from '../../../../reducers/productReducer/ProductReducer';



export const Product = () => {


    const dispatch = useAppDispatch()
    const product = useAppSelector(state => state.product.content)
    const products_photo = useAppSelector(state => state.images.content)
    const error = useAppSelector(state => state.app.error)
    const categories_data = useAppSelector(state => state.categories.content)



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


    useEffect(() => {
        dispatch(getCategoriesData())
    }, [])


    useEffect(() => {
        dispatch(fetchImagesData())
    }, [])

    console.log(error);

    return (
        <div className={s.product_wrapper}>
            <div className={s.product_title}>
                Pink Punk Product
            </div>
            <div className={s.flex_product_wrapper}>
                <div className={s.image_wrapper}>
                    {product.images.map((img_url) => {
                        return (
                            <img src={`http://91.149.142.24:9000/storage${img_url.image?.url}`}
                                key={img_url.image?.id} alt="pink_punk_products" />
                        )
                    })}
                </div>
                <div className={s.product_info}>
                    <Formik
                        initialValues={{
                            id: product.id,
                            slug: product.slug,
                            price: product.price,
                            active: product.active,
                            sex: product.sex,
                            collectionId: null,
                            currencySymbol: product.currencySymbol,
                            fields: [
                                {
                                    fieldName: product.fields[2].fieldName,
                                    fieldValue: product.fields[2].fieldValue,
                                    languageId: product.fields[2].languageId
                                },
                                {
                                    fieldName: product.fields[3].fieldName,
                                    fieldValue: product.fields[3].fieldValue,
                                    languageId: product.fields[3].languageId
                                },
                                {
                                    fieldName: product.fields[5].fieldName,
                                    fieldValue: product.fields[5].fieldValue,
                                    languageId: product.fields[5].languageId
                                },
                                {
                                    fieldName: product.fields[0].fieldName,
                                    fieldValue: product.fields[0].fieldValue,
                                    languageId: product.fields[0].languageId
                                },
                                {
                                    fieldName: product.fields[1].fieldName,
                                    fieldValue: product.fields[1].fieldValue,
                                    languageId: product.fields[1].languageId
                                },
                                {
                                    fieldName: product.fields[4].fieldName,
                                    fieldValue: product.fields[4].fieldValue,
                                    languageId: product.fields[4].languageId
                                }
                            ],
                            categories: product.categories,
                            images: [],
                            tags: []
                        }}
                        validationSchema={AddProductSchema}
                        onSubmit={(values: ContentObj, { setSubmitting, setStatus }: FormikHelpers<ContentObj>) => {
                            alert(JSON.stringify(values))
                            dispatch(updateProductData(values))

                        }
                        }
                    >
                        {(props) => {

                            return (
                                <div className={s.all_wrapper}>
                                    <ErrorSnackbar />


                                    <Form className={s.form_wrapper} onSubmit={props.handleSubmit}>
                                        <div className={s.title_for_form}> Edit Product</div>
                                        <div className={s.button_wrapper} >
                                            <Button className={s.button_submit} variant="outlined" type="submit">PRESS TO EDIT</Button>
                                        </div>
                                        <div className={s.first_form_wrapper}>

                                            <div className={s.first_flex_wrapper}>
                                                <div className={s.slug_wrapper}>
                                                    <TextField
                                                        id="outlined-basic"
                                                        name="slug"
                                                        label="Slug"
                                                        type="text"
                                                        fullWidth={true}
                                                        onBlur={props.handleBlur}
                                                        onChange={props.handleChange}
                                                        defaultValue={props.values.slug}
                                                        color={props.touched.slug && props.errors.slug ? 'error' : 'primary'}
                                                        variant="outlined" />
                                                    {props.touched.slug && props.errors.slug
                                                        ? <div className={s.error_val}>
                                                            {props.errors.slug}
                                                        </div>
                                                        : null}
                                                </div>
                                                <div className={s.price_wrapper}>
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
                                                        ? <div className={s.error_val}>
                                                            {props.errors.price}
                                                        </div>
                                                        : null}
                                                </div>
                                                <div className={s.collectionId_wrapper}>
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
                                                <div className={s.sex_wrapper}>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-label">Sex</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id='sex'
                                                            name='sex'
                                                            defaultValue={props.values.sex}
                                                            label="Sex"
                                                            onChange={props.handleChange}
                                                            color={props.touched.sex && props.errors.sex ? 'error' : 'primary'}
                                                        >
                                                            <MenuItem value={'male'}>male</MenuItem>
                                                            <MenuItem value={'female'}>female</MenuItem>
                                                            <MenuItem value={'uni'}>unisex</MenuItem>
                                                        </Select>
                                                        {props.touched.sex && props.errors.sex
                                                            ? <div className={s.error_val}>
                                                                {props.errors.sex}
                                                            </div>
                                                            : null}
                                                    </FormControl>
                                                </div>
                                            </div>

                                            <div className={s.second_flex_wrapper}>
                                                <div className={s.currency_symbol_wrapper}>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id='currencySymbol'
                                                            name='currencySymbol'
                                                            defaultValue={props.values.currencySymbol}
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
                                                <div className={s.categories_wrapper}>

                                                    <FieldArray
                                                        name='categories'
                                                        render={arrayHelpers => (
                                                            <div className={s.categories}>
                                                                {props.values.categories.map((cat, index) => {

                                                                    return (
                                                                        <FormControl fullWidth key={index}>
                                                                            <InputLabel id="demo-simple-select-label">Categories</InputLabel>
                                                                            <Select
                                                                                labelId="demo-simple-select-label"
                                                                                id='categories'
                                                                                name={`categories.${index}.id`}
                                                                                label="categories"
                                                                                onChange={props.handleChange}
                                                                                onBlur={props.handleBlur}
                                                                                color={'primary'}
                                                                                defaultValue={props.values.categories[0].id}
                                                                            >
                                                                                {categories_data.map((cat_val) =>
                                                                                    <MenuItem key={cat_val && cat_val.id} value={cat_val && cat_val.id}>{cat_val && cat_val.slug}</MenuItem>)}


                                                                            </Select>
                                                                        </FormControl>
                                                                    )
                                                                })}
                                                            </div>
                                                        )}
                                                    />

                                                </div>
                                                <div className={s.active_wrapper}>
                                                    <FormControlLabel
                                                        control={<IOSSwitch sx={{ mx: 2 }} defaultChecked={props.values.active} />}
                                                        id='active'
                                                        name="active"
                                                        onChange={props.handleChange}
                                                        label="active product"


                                                    />
                                                </div>
                                            </div>

                                        </div>

                                        <div className={s.fields_wrapper}>
                                            <div className={s.title_for_fields}>fields multilingual</div>

                                            <FieldArray
                                                name="fields"
                                                render={arrayHelpers => (
                                                    <div className={s.flex_container_for_fields}>
                                                        <div className={s.english_fields}>
                                                            {props.values.fields.map((field, index) => {
                                                                const valueForField = props.errors.fields && props.errors.fields[index]
                                                                const arrVal = valueForField && Object.values(valueForField)


                                                                return (
                                                                    <div key={index}>
                                                                        {props.values.fields[index].fieldName === 'name' &&
                                                                            props.values.fields[index].languageId === 1 &&
                                                                            <div className={s.fields_icon} >
                                                                                <TextField
                                                                                    id='FieldValueName'
                                                                                    name={`fields.${index}.fieldValue`}
                                                                                    label='Name ENG'
                                                                                    fullWidth={true}
                                                                                    type={"text"}
                                                                                    onChange={props.handleChange}
                                                                                    onBlur={props.handleBlur}
                                                                                    defaultValue={props.values.fields[0].fieldValue}
                                                                                />
                                                                                {(props.touched.fields && props.errors.fields)
                                                                                    && (props.touched.fields[index] && props.errors.fields[index]) ?
                                                                                    <div className={s.error_val}>
                                                                                        {arrVal && arrVal[0]}
                                                                                    </div>
                                                                                    : null
                                                                                }
                                                                            </div>}

                                                                        {props.values.fields[index].fieldName === 'decription' &&
                                                                            props.values.fields[index].languageId === 1 &&
                                                                            <div className={s.fields_icon}>
                                                                                <TextField
                                                                                    id='FieldValueDescription'
                                                                                    name={`fields.${index}.fieldValue`}
                                                                                    label='Description ENG'
                                                                                    fullWidth={true}
                                                                                    type={"text"}
                                                                                    onChange={props.handleChange}
                                                                                    onBlur={props.handleBlur}
                                                                                    defaultValue={props.values.fields[2].fieldValue}
                                                                                />
                                                                                {(props.touched.fields && props.errors.fields)
                                                                                    && (props.touched.fields[index] && props.errors.fields[index]) ?
                                                                                    <div className={s.error_val}>
                                                                                        {arrVal && arrVal[0]}
                                                                                    </div>
                                                                                    : null
                                                                                }
                                                                            </div>}

                                                                        {props.values.fields[index].fieldName === 'path' &&
                                                                            props.values.fields[index].languageId === 1 &&
                                                                            <div className={s.fields_icon}>
                                                                                <TextField
                                                                                    id='FieldValuePath'
                                                                                    name={`fields.${index}.fieldValue`}
                                                                                    label='Path ENG'
                                                                                    fullWidth={true}
                                                                                    type={"text"}
                                                                                    onChange={props.handleChange}
                                                                                    onBlur={props.handleBlur}
                                                                                    defaultValue={props.values.fields[1].fieldValue}
                                                                                />
                                                                                {(props.touched.fields && props.errors.fields)
                                                                                    && (props.touched.fields[index] && props.errors.fields[index]) ?
                                                                                    <div className={s.error_val}>
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
                                                        <div className={s.russian_fields}>
                                                            {props.values.fields.map((field, index) => {
                                                                const valueForField = props.errors.fields && props.errors.fields[index]
                                                                const arrVal = valueForField && Object.values(valueForField)
                                                                return (
                                                                    <div key={index}>
                                                                        {props.values.fields[index].fieldName === 'name' &&
                                                                            props.values.fields[index].languageId === 2 &&
                                                                            <div className={s.fields_icon}>
                                                                                <TextField
                                                                                    id='FieldValueName'
                                                                                    name={`fields.${index}.fieldValue`}
                                                                                    label='Name RUS'
                                                                                    fullWidth={true}
                                                                                    type={"text"}
                                                                                    onBlur={props.handleBlur}
                                                                                    onChange={props.handleChange}
                                                                                    defaultValue={props.values.fields[3].fieldValue}
                                                                                />
                                                                                {(props.touched.fields && props.errors.fields)
                                                                                    && (props.touched.fields[index] && props.errors.fields[index]) ?
                                                                                    <div className={s.error_val}>
                                                                                        {arrVal && arrVal[0]}
                                                                                    </div>
                                                                                    : null
                                                                                }
                                                                            </div>}
                                                                        {props.values.fields[index].fieldName === 'description' &&
                                                                            props.values.fields[index].languageId === 2 &&
                                                                            <div className={s.fields_icon}>
                                                                                <TextField
                                                                                    id='FieldValueDescription'
                                                                                    name={`fields.${index}.fieldValue`}
                                                                                    label='Description RUS'
                                                                                    fullWidth={true}
                                                                                    type={"text"}
                                                                                    onBlur={props.handleBlur}
                                                                                    onChange={props.handleChange}
                                                                                    defaultValue={props.values.fields[5].fieldValue}
                                                                                />
                                                                                {(props.touched.fields && props.errors.fields)
                                                                                    && (props.touched.fields[index] && props.errors.fields[index]) ?
                                                                                    <div className={s.error_val}>
                                                                                        {arrVal && arrVal[0]}
                                                                                    </div>
                                                                                    : null
                                                                                }
                                                                            </div>}
                                                                        {props.values.fields[index].fieldName === 'path' &&
                                                                            props.values.fields[index].languageId === 2 &&
                                                                            <div className={s.fields_icon}>
                                                                                <TextField
                                                                                    id='FieldValuePath'
                                                                                    name={`fields.${index}.fieldValue`}
                                                                                    label='Path RUS'
                                                                                    fullWidth={true}
                                                                                    type={"text"}
                                                                                    onBlur={props.handleBlur}
                                                                                    onChange={props.handleChange}
                                                                                    defaultValue={props.values.fields[4].fieldValue}
                                                                                />
                                                                                {(props.touched.fields && props.errors.fields)
                                                                                    && (props.touched.fields[index] && props.errors.fields[index]) ?
                                                                                    <div className={s.error_val}>
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
                                            render={() => (
                                                <div className={s.product_photo_wrapper}>
                                                    <div className={s.photo_title}>photo selection</div>
                                                    <div className={s.flex_wrapper_photo}>
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
                                                                    <div key={ph.id} className={s.prod_photo} >
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
                </div>
            </div>
        </div>

    );
}