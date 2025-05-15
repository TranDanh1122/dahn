import { useMutation } from '@tanstack/react-query'
import { type RegisterData } from "@auth/models"
import { postLoginAPI, postRegisterAPI } from '@auth/flows/ropc/ropc.api'
export const useRegisterSvc = () => {
    return useMutation({
        mutationFn: async (data: RegisterData) => {
            const res = await postRegisterAPI(data)
            return res.data
        }
    })
}
export const useLoginSvc = () => {
    return useMutation({
        mutationFn: async (data: Omit<RegisterData, "confirmPassword">) => {
            const res = await postLoginAPI(data)
            return res.data
        }
    })
}