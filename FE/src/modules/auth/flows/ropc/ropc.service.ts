import { useMutation } from '@tanstack/react-query'
import { type AuthRequestData, type ResetPassData } from "@auth/models"
import { postRegisterAPI, postForgotPassword, postResetPassword, postLoginAPI } from '@auth/flows/ropc/ropc.api'

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
