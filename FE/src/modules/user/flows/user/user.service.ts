import { useMutation } from "@tanstack/react-query"
import type { SearchUserParams, User } from "@user/models/user.schema"
import { searchUserAPI } from "@user/flows/user/user.api"

export const useSearchUserSvc = () => {
    return useMutation<User[], Error, SearchUserParams>({
        mutationFn: async (data: SearchUserParams) => {
            const res = await searchUserAPI(data)
            return res.data.users
        },
    })
}

export const searchUserFn = async (data: SearchUserParams) => {
    const res = await searchUserAPI(data)
    return res.data.users
}