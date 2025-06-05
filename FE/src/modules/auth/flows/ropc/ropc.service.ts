import { useMutation } from '@tanstack/react-query'
import { type AuthRequestData, type ResetPassData } from "@auth/models"
import { postRegisterAPI, postForgotPassword, postResetPassword, postLoginAPI, postLoginOTP, postResendOTP } from '@auth/flows/ropc/ropc.api'
import type { AppDispatch } from '@/stores'
import { useDispatch } from 'react-redux'
import { setUser } from '@auth/stores'
import type { AuthSuccessReponse } from '@auth/models/response.model'
import type { VerifyOTPData } from '@auth/models/request.schemas'
import { ErrorHandler, SuccessHandle } from "@/common/ults/NotifyHandler"
import type { HTTPError } from 'ky'
export const useRegisterSvc = () => {
    return useMutation({
        mutationFn: async (data: AuthRequestData) => {
            const res = await postRegisterAPI(data)
            return await res.json()
        },
        onSuccess: () => {
            SuccessHandle("Register Success, redirect continue step")
        },
        onError: async (e: HTTPError) => {
            const body = await e.response.json<{ message: string }>();
            ErrorHandler(body.message)
        },
        retry: false
    })
}
export const useLoginSvc = () => {

    return useMutation({
        mutationFn: async (data: Omit<AuthRequestData, "confirmPassword">) => {
            const res = await postLoginAPI(data)
            if (res.status > 200) throw new Error(await res.json())
            return await res.json()
        },
        onError: async (e: HTTPError) => {
            const body = await e.response.json<{ message: string }>();
            ErrorHandler(body.message)
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
            return await res.json()
        },
        onError: async (e: HTTPError) => {
            const body = await e.response.json<{ message: string }>();
            ErrorHandler(body.message)
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
            return await res.json()
        },
        onError: async (e: HTTPError) => {
            const body = await e.response.json<{ message: string }>();
            ErrorHandler(body.message)
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
            return await res.json<AuthSuccessReponse>()
        },
        onError: async (e: HTTPError) => {
            const body = await e.response.json<{ message: string }>();
            ErrorHandler(body.message)
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
            return await res.json()
        },
        onError: async (e: HTTPError) => {
            const body = await e.response.json<{ message: string }>();
            ErrorHandler(body.message)
        }, onSuccess: () => {
            SuccessHandle("Email with OTP re-send to you")
        },
        retry: false
    })
}
