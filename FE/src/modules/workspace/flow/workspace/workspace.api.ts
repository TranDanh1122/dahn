import { API_ENDPOINT } from "@/common/ults/ApiEndpoint.const";
import { AxiosClient } from "@/common/ults/AxiosClient.const";
import type { WorkspaceFormData } from "@workspace/models/request.schema";

export const postWorkspaceAPI = async (data: WorkspaceFormData) => AxiosClient.post(API_ENDPOINT.workspace, data, { withCredentials: true })
export const getWorkspaceAPI = async () => AxiosClient.get(API_ENDPOINT.workspace, { withCredentials: true })
export const deleteWorkspaceAPI = async (id: string) => AxiosClient.delete(`${API_ENDPOINT.workspace}/${id}`, { withCredentials: true })
export const acceptedInviteAPI = async (token: string) => AxiosClient.post(`${API_ENDPOINT.acceptedInvite}`, { token }, { withCredentials: true })