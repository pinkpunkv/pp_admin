import axios from "axios";
import { getToLocalStorage } from "../common/localStorage/LocalStorage";


export const instance = axios.create({
    baseURL: 'http://91.149.142.24:3000/api/v1/',
    headers: { 'Authorization': ` ${getToLocalStorage('Authorization')}` }
})

