import { useMutation } from "@tanstack/react-query"
import type { SearchUserParams } from "@user/models/user.schema"
import { searchUserAPI } from "@user/flows/user/user.api"

export const useSearchUserSvc = () => {
    return useMutation({
        mutationFn: async (data: SearchUserParams) => {
            const res = await searchUserAPI(data)
            return res.data
        }
    })
}