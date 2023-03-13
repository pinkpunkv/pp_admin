import React, { SyntheticEvent, ChangeEvent, ReactNode, useState } from 'react';
import { Button, FormControlLabel, TextField } from '@mui/material';
import style from './AddSelectPhotoModal.module.scss'
import { BasicModal } from '../../common/basic_modal/BasicModal';
import { IOSSwitch } from '../../common/styles/themeForIOSUtil';
import { ImgObj } from '../../api/products_data_api/ProductsAPI';


type AddPackModalType = {
    children: ReactNode
    dataImages: ImgObj[]
    photoId?: number
    index: number
    values: any
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | SyntheticEvent<Element, Event>) => void
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
}

export const AddSelectPhotoModal = ({ children, photoId, index, onChange, setFieldValue, values }: AddPackModalType) => {

    const imageObject: ImgObj = {
        imageId: photoId && photoId,
        isMain: false,
        number: 0
    }
    const [imageObj, setImageObj] = useState<ImgObj>(imageObject)

    const changeIsMainHandler = (e: React.ChangeEvent<HTMLTextAreaElement |
        HTMLInputElement> | SyntheticEvent<Element, Event>, index: number) => {
        const eventIsMain = (e.target as HTMLInputElement).checked

        setImageObj({ ...imageObj, isMain: eventIsMain })

    }

    const changeImageNumberHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const imageNumber = e.currentTarget.value
        setImageObj({ ...imageObj, number: Number(imageNumber) })
    }


    const AddNewImgObj = async (handleClose: () => void) => {

        values.images.push(imageObj)
        handleClose()
    }

    return (
        <BasicModal childrenBtn={children} name={'Select Photo'}>
            {(handleClose: () => void) =>
                <div className={style.modal_wrapper}>

                    <div className={style.text_form_flex}>
                        <TextField
                            id="outlined-name"
                            name={`images.${index}.imageId`}
                            type='number'
                            value={photoId}
                            variant="outlined"
                            label='photo id'
                            className={style.field_style}
                        />
                        <TextField
                            id="outlined-name"
                            name={`images.${index}.number`}
                            onChange={(e) => changeImageNumberHandler(e)}
                            value={imageObj.number}
                            type='number'
                            label='number'
                            variant="outlined"
                            className={style.field_style}
                        />
                    </div>
                    <div className={style.is_main}>
                        <FormControlLabel
                            control={<IOSSwitch sx={{ mx: 2 }} checked={imageObj.isMain} />}
                            id='isMain'
                            name={`images.${index}.isMain`}
                            onChange={(e) => changeIsMainHandler(e, index)}
                            label=" is main"

                        />
                    </div>

                    <div className={style.button_modal}>
                        <Button onClick={() => AddNewImgObj(handleClose)}
                            variant="outlined" type="submit"
                        >Save</Button>
                    </div>

                </div>}
        </BasicModal>
    );
};