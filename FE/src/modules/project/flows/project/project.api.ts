import { API_ENDPOINT } from "@/common/ults/ApiEndpoint.const";
import { AxiosClient } from "@/common/ults/AxiosClient.const";
import { type EnvData, type MilestoneData, type ProjectData, type RoleData, step1Schema } from "@project/models";
import type { z } from "zod";

export const createProjectAPI = async (data: ProjectData) =>
    await AxiosClient.post(API_ENDPOINT.project, {
        json: data,
        credentials: "include",
    });
export const getProjectAPI = async (projectId: string) =>
    await AxiosClient.get(`${API_ENDPOINT.project}/${projectId}`, {
        credentials: "include",
    });
export const deleteProjectAPI = async (projectId: string) =>
    await AxiosClient.delete(`${API_ENDPOINT.project}/${projectId}`, {
        credentials: "include",
    });
export const updateGeneralInfoAPI = async (
    projectId: string,
    data: z.infer<typeof step1Schema>,
    signal?: AbortSignal
) =>
    await AxiosClient.put(`${API_ENDPOINT.project}/${projectId}/general`, {
        json: data,
        credentials: "include",
        signal
    });
export const updateEnvAPI = async (
    projectId: string,
    data: EnvData,
    envId?: string
) =>
    await AxiosClient.put(
        `${API_ENDPOINT.project}/${projectId}/environment/${envId || ""}`,
        { json: data, credentials: "include" }
    );
export const deleteEnvAPI = async (projectId: string, envId: string) =>
    await AxiosClient.delete(
        `${API_ENDPOINT.project}/${projectId}/environment/${envId}`, { credentials: "include" }
    )

export const updateMilestoneAPI = async (projectId: string, data: MilestoneData) =>
    await AxiosClient.put(
        `${API_ENDPOINT.project}/${projectId}/milestones/${data.id || ""}`,
        { json: data, credentials: "include" }
    )

export const deleteMilestoneAPI = async (projectId: string, milestoneId: string) =>
    await AxiosClient.delete(`${API_ENDPOINT.project}/${projectId}/milestones/${milestoneId}`, { credentials: "include" })

export const updateRoleAPI = async (projectId: string, data: RoleData, roleId?: string) =>
    await AxiosClient.put(`${API_ENDPOINT.project}/${projectId}/role/${roleId || ""}`, { json: data, credentials: "include" })