

import { API_ENDPOINT } from '@/common/ApiEndpoint.const';
import { getAuthWSocicalParam, type SocialConnectionType } from '@auth/flows/pkce/pkce.config'
export const getAuthWSocial = (type: SocialConnectionType) => {
    const param = new URLSearchParams(getAuthWSocicalParam(type))
    console.log(getAuthWSocicalParam(type));
    return API_ENDPOINT.googleAuth(param)
}