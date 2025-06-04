import { API_ENDPOINT } from "@/common/ults/ApiEndpoint.const";
import { AxiosClient } from "@/common/ults/AxiosClient.const";

export const postWorkspaceAPI = async (data: FormData) => await AxiosClient.post(API_ENDPOINT.workspace, data, { withCredentials: true })
export const getWorkspaceAPI = async () => await AxiosClient.get(API_ENDPOINT.workspace, { withCredentials: true })
export const deleteWorkspaceAPI = async (id: string) => await AxiosClient.delete(`${API_ENDPOINT.workspace}/${id}`, { withCredentials: true })
export const acceptedInviteAPI = async (token: string) => await AxiosClient.post(`${API_ENDPOINT.acceptedInvite}`, { token }, { withCredentials: true })
export const getWorkspaceByIDAPI = async (id: string) => await AxiosClient.get(`${API_ENDPOINT.workspace}/${id}`, { withCredentials: true })
export const putWorkspaceByIDAPI = async (id: string, data: FormData) => await AxiosClient.put(`${API_ENDPOINT.workspace}/${id}`, data, { withCredentials: true })