import { API_ENDPOINT } from "@/common/ApiEndpoint.const";
import { AxiosClient } from "@/common/AxiosClient.const";
import type { RegisterData } from "@auth/models";
import { getAuthWSocicalParam, LEGACY_AUTH_PARAM, type SocialConnectionType } from "@auth/config"
export const postRegisterAPI = async (data: RegisterData) => await AxiosClient.post(API_ENDPOINT.signup, {
    ...LEGACY_AUTH_PARAM,
    ...data
})
export const getAuthWSocial = (type: SocialConnectionType) => {
    const param = new URLSearchParams(getAuthWSocicalParam(type))
    return API_ENDPOINT.googleAuth(param)
}