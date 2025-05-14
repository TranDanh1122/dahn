import { API_ENDPOINT } from "@/common/ApiEndpoint";
import { AxiosClient } from "@/common/AxiosClient";
export const postRegisterAPI = () => AxiosClient.post(API_ENDPOINT.signup)