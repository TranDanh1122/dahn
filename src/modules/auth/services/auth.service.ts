import { useMutation } from '@tanstack/react-query'
import { type RegisterData } from "@auth/models"
import { postRegisterAPI } from '@auth/apis/auth.api'
export const useRegister = () => {
    return useMutation({
        mutationFn: async (data: RegisterData) => {
            const res = await postRegisterAPI(data)
            return res.data
        }
    })
}