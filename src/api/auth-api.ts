import {instance, ResponseType} from './todolists-api';

export const authAPI = {
    logIn(data: LogInDataType) {
        return instance.post<ResponseType<{userId: number}>>('/auth/login', data)
    },
    me() {
        return instance.get<ResponseType>('/auth/me')
    },
    logOut() {
        return instance.delete<ResponseType>('/auth/login')
    }
}

export type LogInDataType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}