import { AxiosClient } from "@/common/ults/AxiosClient.const";
import type { SearchUserParams } from "@user/models/user.schema";
import { API_ENDPOINT } from "@/common/ults/ApiEndpoint.const";

export const searchUserAPI = async (data: SearchUserParams) => await AxiosClient.post(API_ENDPOINT.searchUser, data, { withCredentials: true })