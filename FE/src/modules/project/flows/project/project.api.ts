import { API_ENDPOINT } from "@/common/ults/ApiEndpoint.const";
import { AxiosClient } from "@/common/ults/AxiosClient.const";
import type { Project } from "@project/models/request.schema";

export const createProjectAPI = async (data: Project) => await AxiosClient.post(API_ENDPOINT.project, { json: data, credentials: "include" })
export const getProjectAPI = async (projectId: string) => await AxiosClient.get(`${API_ENDPOINT.project}/${projectId}`, { credentials: "include" })