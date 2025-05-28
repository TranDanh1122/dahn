import { useMutation, useQuery } from "@tanstack/react-query"
import { getWorkspaceAPI, postWorkspaceAPI } from "./workspace.api"
import type { WorkspaceFormData } from "@workspace/models/request.schema"
import { ErrorHandler, SuccessHandle } from "@/common/ults/NotifyHandler"
import type { AxiosError } from "axios"
import type { Workspace } from "@workspace/models/response.model"
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
export const useGetWorkspaceSvc = () => {
    return useQuery({
        queryKey: ["workspace"],
        queryFn: async () => {
            try {
                const res = await getWorkspaceAPI()
                return res.data
            } catch (error) {
                const err = error as unknown as AxiosError
                ErrorHandler(err.message || err.response?.data || "Error when try to fetch")
            }
        },
        staleTime: 5 * 1000 * 60, //the time your data expired, and need to refetch
        gcTime: 10 * 1000 * 60, //the time your data removed
        select: (result) => result.data as Workspace[],
        retry: false
    })
}