import { API_ENDPOINT } from "@/common/ApiEndpoint.const";
import { AxiosClient } from "@/common/AxiosClient.const";
import type { RegisterData } from "@auth/models";
export const postRegisterAPI = async (data: RegisterData) => await AxiosClient.post(API_ENDPOINT.signup, {
    client_id: import.meta.env.VITE_AUTH0_CLIENTID,
    connection: import.meta.env.VITE_AUTH0_SIGNUP_CONNECT,
    ...data
})