import { useMutation } from '@tanstack/react-query'
import { type RegisterData } from "@auth/models"
import { getAuthWSocial, postRegisterAPI } from '@auth/apis/auth.api'
import type { SocialConnectionType } from '@auth/config'
export const useRegister = () => {
    return useMutation({
        mutationFn: async (data: RegisterData) => {
            const res = await postRegisterAPI(data)
            return res.data
        }
    })
}
export const useAuthWSocial = () => {

    return {
        action: (type: SocialConnectionType) => window.location.href = getAuthWSocial(type)
    }
}