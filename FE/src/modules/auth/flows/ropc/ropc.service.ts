import { useMutation } from '@tanstack/react-query'
import { type AuthRequestData, type ResetPassData } from "@auth/models"
import { postRegisterAPI, postForgotPassword, postResetPassword, postLoginAPI, postLoginOTP, postResendOTP } from '@auth/flows/ropc/ropc.api'
import type { AppDispatch } from '@/stores'
import { useDispatch } from 'react-redux'
import { setUser } from '@auth/stores'
import type { AuthSuccessReponse } from '@auth/models/response.model'
import type { VerifyOTPData } from '@auth/models/request.schemas'
import { ErrorHandler, SuccessHandle } from "@/common/ults/NotifyHandler"
import type { AxiosError } from 'axios'
export const useRegisterSvc = () => {
    return useMutation({
        mutationFn: async (data: AuthRequestData) => {
            const res = await postRegisterAPI(data)
            return res.data
        },
        onSuccess: () => {
            SuccessHandle("Register Success, redirect continue step")
        },
        onError: (error: AxiosError) => {
            ErrorHandler(error.response?.data || error.message)
        },
        retry: false
    })
}
export const useLoginSvc = () => {

    return useMutation({
        mutationFn: async (data: Omit<AuthRequestData, "confirmPassword">) => {
            const res = await postLoginAPI(data)
            if (res.status > 200) throw new Error(res.data)
            return res.data
        },
        onError: (error: AxiosError) => {
            ErrorHandler(error.response?.data || error.message)
        }, onSuccess: () => {
            SuccessHandle("Login Success, redirect continue step")
        },
        retry: false
    })

}

export const useForgotPasswordSvc = () => {
    return useMutation({
        mutationFn: async (data: { email: string }) => {
            const res = await postForgotPassword(data)
            return res.data
        },
        onError: (error: AxiosError) => {
            ErrorHandler(error.response?.data || error.message)
        }, onSuccess: () => {
            SuccessHandle("Reset password rquest sent, check your email")
        },
        retry: false
    })
}

export const useResetPasswordSvc = () => {
    return useMutation({
        mutationFn: async (data: ResetPassData) => {
            const res = await postResetPassword(data)
            return res.data
        },
        onError: (error: AxiosError) => {
            ErrorHandler(error.response?.data || error.message)
        },
        onSuccess: () => {
            SuccessHandle("Reset password success!")
        },
        retry: false
    })
}

export const useLoginOTPSvc = () => {
    const dispatch: AppDispatch = useDispatch()

    return useMutation({
        mutationFn: async (data: VerifyOTPData) => {
            const res = await postLoginOTP(data)
            return res.data
        },
        onError: (error) => {
            console.log(error)
            ErrorHandler(error.message)
        },
        retry: false,
        onSuccess: (data: AuthSuccessReponse) => {
            dispatch(setUser(data.user))
            SuccessHandle("OTP correct, now try my app!")
        },
    })
}

export const useResendOTPSvc = () => {
    return useMutation({
        mutationFn: async (data: { email: string }) => {
            const res = await postResendOTP(data)
            return res.data
        },
        onError: (error: AxiosError) => {
            ErrorHandler(error.response?.data || error.message)
        }, onSuccess: () => {
            SuccessHandle("Email with OTP re-send to you")
        },
        retry: false
    })
}
