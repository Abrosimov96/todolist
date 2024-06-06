import { instance } from "common/instance"
import { LogInDataType } from "features/auth/api/auth-api.types"
import { BaseResponseType } from "common/types"

export const authAPI = {
    logIn(data: LogInDataType) {
        return instance.post<BaseResponseType<{ userId: number }>>("/auth/login", data)
    },
    me() {
        return instance.get<BaseResponseType>("/auth/me")
    },
    logOut() {
        return instance.delete<BaseResponseType>("/auth/login")
    },
}
