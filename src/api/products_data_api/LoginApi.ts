import { instance } from './../api';

export interface LoginDataType {
    email: string
    password: string
}

export interface responceLoginType {
    status: number,
    message: string
    content: LoginContentType
}
export interface LoginContentType {
    access_token: string
    refresh_token: string
}



export const LoginAPI = {
    login(login_data: LoginDataType) {
        return instance.post<responceLoginType>('user/login', login_data).then(res => {
            return res.data.content
        })
    }

}