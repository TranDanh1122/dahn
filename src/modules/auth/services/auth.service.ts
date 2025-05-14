import { useMutation } from '@tanstack/react-query'
import { type RegisterData } from "@auth/models"
import { postRegisterAPI } from '@auth/apis/auth.api'
export const useRegister = (data: RegisterData) => {
    return useMutation({
        mutationFn: async () => {
            try {
                const res = await postRegisterAPI(data)
                if (res.status != 200) throw new Error(res.statusText)
                return res.data
            } catch (e) {
                console.error(e)
                throw new Error(`Error ${e}`)
            }
        }
    })
}