import { API_ENDPOINT } from "@/common/ults/ApiEndpoint.const";
import { AxiosClient } from "@/common/ults/AxiosClient.const";

export const postWorkspaceAPI = async (data: FormData) => await AxiosClient.post(API_ENDPOINT.workspace, { body: data, credentials: "include" })
export const getWorkspaceAPI = async () => await AxiosClient.get(API_ENDPOINT.workspace, { credentials: "include" })
export const deleteWorkspaceAPI = async (id: string) => await AxiosClient.delete(`${API_ENDPOINT.workspace}/${id}`, { credentials: "include" })
export const acceptedInviteAPI = async (token: string) => await AxiosClient.post(`${API_ENDPOINT.acceptedInvite}`, { json: { token }, credentials: "include" })
export const getWorkspaceByIDAPI = async (id: string) => await AxiosClient.get(`${API_ENDPOINT.workspace}/${id}`, { credentials: "include" })
export const putWorkspaceByIDAPI = async (id: string, data: FormData) => await AxiosClient.put(`${API_ENDPOINT.workspace}/${id}`, { body: data, credentials: "include" })
export const getWorkspaceProjectsByIDAPI = async (id: string) => await AxiosClient.get(`${API_ENDPOINT.workspace}/${id}/projects`, { credentials: "include" })
