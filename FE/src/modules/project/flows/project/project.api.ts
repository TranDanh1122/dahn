import { API_ENDPOINT } from "@/common/ults/ApiEndpoint.const";
import { AxiosClient } from "@/common/ults/AxiosClient.const";
import { type ProjectData, step1Schema } from "@project/models";
import type { z } from "zod";

export const createProjectAPI = async (data: ProjectData) => await AxiosClient.post(API_ENDPOINT.project, { json: data, credentials: "include" })
export const getProjectAPI = async (projectId: string) => await AxiosClient.get(`${API_ENDPOINT.project}/${projectId}`, { credentials: "include" })
export const deleteProjectAPI = async (projectId: string) => await AxiosClient.delete(`${API_ENDPOINT.project}/${projectId}`, { credentials: "include" })
export const updateGeneralInfoAPI = async (projectId: string, data: z.infer<typeof step1Schema>) => await AxiosClient.put(`${API_ENDPOINT.project}/${projectId}/general`, { json: data, credentials: "include" })