import { API_ENDPOINT } from "@/common/ults/ApiEndpoint.const";
import { AxiosClient } from "@/common/ults/AxiosClient.const";
import type { AuthRequestData, ResetPassData } from "@auth/models";
import { REFRESH_TOKEN_PARAM, RESET_PASSSWORD_PARAM } from "@auth/flows/ropc/ropc.config"
import type { VerifyOTPData } from "@auth/models/request.schemas";
export const postRegisterAPI = async (data: AuthRequestData) => await AxiosClient.post(API_ENDPOINT.signup, data)
export const postLoginAPI = async (data: Omit<AuthRequestData, "confirmPassword">) => await AxiosClient.post(API_ENDPOINT.login, data)
export const postForgotPassword = async (data: { email: string }) => await AxiosClient.post(API_ENDPOINT.forgotPass, data, { withCredentials: true })
export const postResetPassword = async (data: ResetPassData) => await AxiosClient.post(API_ENDPOINT.resetPass, { ...data, ...RESET_PASSSWORD_PARAM }, { withCredentials: true })
export const postGetUserAPI = async () => await AxiosClient.get(API_ENDPOINT.getUser, { withCredentials: true })
export const postRefreshTokenAPI = async () => await AxiosClient.post(API_ENDPOINT.refreshToken, {
    ...REFRESH_TOKEN_PARAM
}, { withCredentials: true })
export const postLoginOTP = async (data: VerifyOTPData) => await AxiosClient.post(API_ENDPOINT.login_otp, data, { withCredentials: true })
export const postResendOTP = async (data: { email: string }) => await AxiosClient.post(API_ENDPOINT.sendOTP, data)