import { instance } from './../api';

export interface CategoryObj {
    id?: number,
    isMain?: boolean,
    parentId?: null | number,
    slug?: string
    name?: string
}
export interface CurencyObj {
    imageId: null | number,
    symbol: "BYN"
}
export interface FieldOdj {
    fieldName: string,
    fieldValue: string,
    id?: number,
    languageId: number
}
export interface ImgMetaObj {
    id: number,
    url: string
}
export interface ImgObj {
    image?: ImgMetaObj,
    imageId?: number,
    isMain: boolean,
    number: number | null,
    productId?: number
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
    collection?: CollectionObj,
    collectionId?: null | number,
    currency?: CurencyObj,
    currencySymbol: string,
    fields: Array<FieldOdj>,
    id?: number,
    images: Array<ImgObj>,
    price: string | number,
    sex: string,
    slug: string,
    tags: Array<TagsObj>,
    variants?: Array<VariantObj>

}
export interface ProductsData {
    content: ContentObj[],
    message: string,
    status: number
}
export interface addProductObj {
    id?: number;
    slug: string;
    price: string | number;
    active: boolean;
    sex: string;
    collectionId?: any;
    currencySymbol: string;
    fields: Array<FieldOdj>;
    categories: CategoryObj[];
    tags: TagsObj[];
    images: ImgObj[];
}

interface imagesObject {
    id: number
    url: string
}
export interface responceArrayType<D = []> {
    message: string
    status: number
    content: D
}
export interface responceObOjectType<D = {}> {
    message: string
    status: number
    content: D
}
export interface imagesResponce {
    content: Array<imagesObject>
    message: string
    status: number
}
export const ProductsAPI = {
    getProducts() {
        return instance.get<responceArrayType<ContentObj[]>>('admin/product').then(res => {
            return res.data
        })
    },
    addProduct(new_product: addProductObj) {
        return instance.post<responceObOjectType<ContentObj>>('admin/product', new_product).then(res => {
            return res.data.content
        })
    },
    removeProduct(productId: number) {
        return instance.delete(`admin/product/${productId}`)
    },
    getProduct(productId: number) {
        return instance.get<responceObOjectType<ContentObj>>(`admin/product/${productId}`).then(res => {
            return res.data
        })
    },
    updateProduct(update_product_obj: ContentObj) {
        return instance.put<responceObOjectType<ContentObj>>(`admin/product/${update_product_obj.id}`, { update_product_obj })
            .then(res => {
                return res.data
            })
    }

}

export const CategoryAPI = {
    getCategory() {
        return instance.get<responceArrayType<CategoryObj[]>>('category').then(res => {
            return res
        })
    }
}


export const ImagesAPI = {
    getImagesData() {
        return instance.get<imagesResponce>('admin/image').then(res => {
            return res.data
        })
    },
}

