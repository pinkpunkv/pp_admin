import { instance } from './../api';

export interface CategoryObj {
    id: number,
    isMain: boolean,
    parentId: null | number,
    slug: string
}
export interface CurencyObj {
    imageId: null | number,
    symbol: "BYN"
}
export interface FieldOdj {
    fieldName: string,
    fieldValue: string,
    id: number,
    languageId: number
}
export interface ImgMetaObj {
    id: number,
    url: string
}
export interface ImgObj {
    image: ImgMetaObj,
    imageId: number,
    isMain: boolean,
    number: number,
    productId: number
}
export interface CollectionObj {
    id: number
    fields: Array<FieldOdj>
}
export interface TagsObj {
    tag: string
}
export interface VariantObj {
    color: string
    count: number
    id: number
    productId: number
    size: string
}
export interface ContentObj {
    active: boolean,
    categories: Array<CategoryObj>,
    collection: CollectionObj,
    collectionId: null | number,
    currency: CurencyObj,
    currencySymbol: "BYN",
    fields: FieldOdj,
    id: number,
    images: Array<ImgObj>,
    price: string,
    sex: string,
    slug: string,
    tags: Array<TagsObj>,
    variants: Array<VariantObj>

}
export interface ProductsData {
    content: ContentObj[],
    message: string,
    status: number
}

export const ProductsAPI = {
    getProducts() {

        return instance.get<ProductsData>('admin/product').then(res => {
            console.log(res.data)
            return res.data
        })
    }
}