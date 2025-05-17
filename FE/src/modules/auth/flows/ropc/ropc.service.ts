import { useMutation } from '@tanstack/react-query'
import { type AuthRequestData, type ResetPassData } from "@auth/models"
import { useDispatch } from "react-redux"
import {loginThunk} from "@auth/stores/login.thunk"
import {  postRegisterAPI, postForgotPassword, postResetPassword } from '@auth/flows/ropc/ropc.api'
import type { AppDispatch } from '@/stores'
export const useRegisterSvc = () => {
    return useMutation({
        mutationFn: async (data: AuthRequestData) => {
            const res = await postRegisterAPI(data)
            return res.data
        }
    })
}
export const useLoginSvc = () => {
    // return useMutation({
    //     mutationFn: async (data: Omit<AuthRequestData, "confirmPassword">) => {
    //         const res = await postLoginAPI(data)
    //         return res.data
    //     }
    // })
    const dispatch = useDispatch<AppDispatch>()
    return (data: Omit<AuthRequestData, "confirmPassword">) => {
        dispatch(loginThunk(data))
    }
}

export const useForgotPasswordSvc = () => {
    return useMutation({
        mutationFn: async (data: { email: string }) => {
            const res = await postForgotPassword(data)
            return res.data
        }
    })
}

export const useResetPasswordSvc = () => {
    return useMutation({
        mutationFn: async (data: ResetPassData) => {
            const res = await postResetPassword(data)
            return res.data
        }
    })
}
