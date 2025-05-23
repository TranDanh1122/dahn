import { useMutation } from '@tanstack/react-query'
import { type AuthRequestData, type ResetPassData } from "@auth/models"
import { postRegisterAPI, postForgotPassword, postResetPassword, postLoginAPI, postLoginOTP } from '@auth/flows/ropc/ropc.api'
import type { AppDispatch } from '@/stores'
import { useDispatch } from 'react-redux'
import { setUser } from '@auth/stores'
import type { AuthSuccessReponse } from '@auth/models/response.model'
import type { VerifyOTPData } from '@auth/models/request.schemas'

export const useRegisterSvc = () => {
    return useMutation({
        mutationFn: async (data: AuthRequestData) => {
            const res = await postRegisterAPI(data)
            return res.data
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

        retry: false
    })

}

export const useForgotPasswordSvc = () => {
    return useMutation({
        mutationFn: async (data: { email: string }) => {
            const res = await postForgotPassword(data)
            return res.data
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
        retry: false,
        onSuccess: (data: AuthSuccessReponse) => {
            dispatch(setUser(data.user))
        },
    })
}
