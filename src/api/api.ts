import axios from "axios";


export const instance = axios.create({
    baseURL: 'http://91.149.142.24:3000/api/v1/'
})

