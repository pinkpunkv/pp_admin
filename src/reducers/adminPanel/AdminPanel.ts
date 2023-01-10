import { ProductsData } from "../../api/products_data_api/ProductsAPI";

export type initialStateType = ProductsData

const initialState: initialStateType = {
    content: {
        active: false,
        categories: [],
        collection: {},
        collectionId: null,
        currency: {
            imageId: null,
            symbol: "BYN"
        },
        currencySymbol: "BYN",
        fields: {
            fieldName: '',
            fieldValue: '',
            id: 0,
            languageId: 0
        },
        id: 0,
        images: [
            {
                image: {
                    id: 0,
                    url: ''
                },
                imageId: 0,
                isMain: false,
                number: 0,
                productId: 0
            }],
        price: '',
        sex: '',
        slug: '',
        tags: [],
        variants: [
            {
                color: '',
                count: 0,
                id: 0,
                productId: 0,
                size: ''
            }
        ],
    },
    message: '',
    status: 0
}