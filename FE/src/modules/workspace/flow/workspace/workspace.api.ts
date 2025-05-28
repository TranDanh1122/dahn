import { API_ENDPOINT } from "@/common/ults/ApiEndpoint.const";
import { AxiosClient } from "@/common/ults/AxiosClient.const";
import type { WorkspaceFormData } from "@workspace/models/request.schema";

export const postWorkspaceAPI = async (data: WorkspaceFormData) => AxiosClient.post(API_ENDPOINT.createWorkspace, data, { withCredentials: true })