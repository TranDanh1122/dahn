import { API_ENDPOINT } from "@/common/ApiEndpoint.const";
import { AxiosClient } from "@/common/AxiosClient.const";
import type { RegisterData } from "@auth/models";
import { LEGACY_AUTH_PARAM } from "@auth/flows/ropc/ropc.config"
export const postRegisterAPI = async (data: RegisterData) => await AxiosClient.post(API_ENDPOINT.signup, {
    ...LEGACY_AUTH_PARAM,
    ...data
})