import { API_ENDPOINT } from "@/common/ults/ApiEndpoint.const";
import { AxiosClient } from "@/common/ults/AxiosClient.const";
import type { ProjectData } from "@project/models/request.schema";

export const createProjectAPI = async (data: ProjectData) => await AxiosClient.post(API_ENDPOINT.project, { json: data, credentials: "include" })
export const getProjectAPI = async (data: { workspaceID: string }) => await AxiosClient.get(API_ENDPOINT.project, { json: data, credentials: "include" })