import { useMutation } from "@tanstack/react-query"
import { postWorkspaceAPI } from "./workspace.api"
import type { WorkspaceFormData } from "@workspace/models/request.schema"
import { ErrorHandler, SuccessHandle } from "@/common/ults/NotifyHandler"
import type { AxiosError } from "axios"
export const useCreateWorkspaceSvc = () => {
    return useMutation({
        mutationFn: async (data: WorkspaceFormData) => {
            const res = await postWorkspaceAPI(data)
            return res.data
        },
        onSuccess: () => SuccessHandle("Workspace created!"),
        onError: (error: AxiosError) => {
            ErrorHandler(error.response?.data || error.message)
        },
    })
}