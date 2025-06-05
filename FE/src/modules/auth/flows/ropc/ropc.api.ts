import { API_ENDPOINT } from "@/common/ults/ApiEndpoint.const";
import { AxiosClient } from "@/common/ults/AxiosClient.const";
import type { AuthRequestData, ResetPassData } from "@auth/models";
import { REFRESH_TOKEN_PARAM, RESET_PASSSWORD_PARAM } from "@auth/flows/ropc/ropc.config"
import type { VerifyOTPData } from "@auth/models/request.schemas";
export const postRegisterAPI = async (data: AuthRequestData) => await AxiosClient.post(API_ENDPOINT.signup, { json: data })
export const postLoginAPI = async (data: Omit<AuthRequestData, "confirmPassword">) => await AxiosClient.post(API_ENDPOINT.login, { json: data })
export const postForgotPassword = async (data: { email: string }) => await AxiosClient.post(API_ENDPOINT.forgotPass, { credentials: "include", json: data })
export const postResetPassword = async (data: ResetPassData) => await AxiosClient.post(API_ENDPOINT.resetPass, { json: { ...data, ...RESET_PASSSWORD_PARAM }, credentials: "include" })
export const postGetUserAPI = async () => await AxiosClient.get(API_ENDPOINT.getUser, { credentials: "include" })
export const postRefreshTokenAPI = async () => await AxiosClient.post(API_ENDPOINT.refreshToken, {
    json: { ...REFRESH_TOKEN_PARAM }, credentials: "include"
})
export const postLoginOTP = async (data: VerifyOTPData) => await AxiosClient.post(API_ENDPOINT.login_otp, { credentials: "include", json: data })
export const postResendOTP = async (data: { email: string }) => await AxiosClient.post(API_ENDPOINT.sendOTP, { json: data })