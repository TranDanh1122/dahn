import { API_ENDPOINT } from "@/common/ults/ApiEndpoint.const";
import { AxiosClient } from "@/common/ults/AxiosClient.const";

export const getTechstacks = async () => await AxiosClient.get(API_ENDPOINT.techStacks, { withCredentials: true }) 