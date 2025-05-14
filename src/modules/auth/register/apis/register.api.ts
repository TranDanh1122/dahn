import { AxiosClient } from "@/common/AxiosClient";
import type { RegisterData } from "@auth/register/models/request.model";
export const registerAPI = (data: RegisterData) => AxiosClient.post(`https://${import.meta.env.VITE_AUTH0_DOMAIN}/dbconnecttion/signup`, data)
