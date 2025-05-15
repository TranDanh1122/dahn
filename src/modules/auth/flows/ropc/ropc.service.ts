import { useMutation } from '@tanstack/react-query'
import { type RegisterData } from "@auth/models"
import { postRegisterAPI } from '@auth/flows/ropc/ropc.api'
export const useRegisterSvc = () => {
    return useMutation({
        mutationFn: async (data: RegisterData) => {
            const res = await postRegisterAPI(data)
            return res.data
        }
    })
}