import { API_ENDPOINT } from "@/common/ApiEndpoint.const";
import { AxiosClient } from "@/common/AxiosClient.const";
import type { AuthRequestData, ResetPassData } from "@auth/models";
import { LEGACY_REGISTER_PARAM, LEGACY_LOGIN_PARAM } from "@auth/flows/ropc/ropc.config"
export const postRegisterAPI = async (data: AuthRequestData) => await AxiosClient.post(API_ENDPOINT.signup, {
    ...LEGACY_REGISTER_PARAM,
    ...data
})
export const postLoginAPI = async (data: Omit<AuthRequestData, "confirmPassword">) => await AxiosClient.post(API_ENDPOINT.login, {
    username: data.email,
    password: data.password,
    ...LEGACY_LOGIN_PARAM
}, { withCredentials: true })

export const postForgotPassword = async (data: { email: string }) => await AxiosClient.post(API_ENDPOINT.forgotPass, {
    ...LEGACY_REGISTER_PARAM,
    ...data
})

export const postResetPassword = async (data: ResetPassData) => await AxiosClient.post(API_ENDPOINT.resetPass, {
    ...data
})

export const postGetUserAPI = async () => await AxiosClient.get(API_ENDPOINT.getUser)