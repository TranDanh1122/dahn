import { useMutation } from "@tanstack/react-query"
import { getAuthWSocial, postGetPKCEToken } from "./pkce.api"
import type { SocialConnectionType } from "./pkce.config"
import type { AuthSuccessReponse } from "@auth/models/response.model"
import type { AppDispatch } from "@/stores"
import { useDispatch } from "react-redux"
import { setUser } from "@auth/stores"
import { ErrorHandler, SuccessHandle } from "@/common/ults/NotifyHandler"
import type { HTTPError } from "ky"
export const useAuthWSocial = () => {

    return {
        action: async (type: SocialConnectionType) => window.location.href = await getAuthWSocial(type)
    }
}
export const useGetPKCEToken = () => {
    const dispatch: AppDispatch = useDispatch()

    return useMutation({
        mutationFn: async (code: string) => {
            const res = await postGetPKCEToken(code)
            return await res.json<AuthSuccessReponse>()
        },
        onError: async (e: HTTPError) => {
            const body = await e.response.json<{ message: string }>();
            ErrorHandler(body.message)
        },
        onSuccess: (data: AuthSuccessReponse) => {
            dispatch(setUser(data.user))
            SuccessHandle("Login success, now try my app!")
        }
    })
}

