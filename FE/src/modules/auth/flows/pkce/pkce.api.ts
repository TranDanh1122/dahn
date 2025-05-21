

import { API_ENDPOINT } from '@/common/ults/ApiEndpoint.const';
import { AxiosClient } from '@/common/ults/AxiosClient.const';
import { requestPKCEAuthParam, type SocialConnectionType, requestPKCEAccessTokenParam } from '@auth/flows/pkce/pkce.config'
export const getAuthWSocial = async (type: SocialConnectionType) => {
    const param = new URLSearchParams(await requestPKCEAuthParam(type))
    return API_ENDPOINT.pkceAuth(param)
}
export const postGetPKCEToken = async (serverCode: string) => {
    const param = requestPKCEAccessTokenParam(serverCode)
    return await AxiosClient.post(API_ENDPOINT.pkceGetToken, param, { withCredentials: true })
}