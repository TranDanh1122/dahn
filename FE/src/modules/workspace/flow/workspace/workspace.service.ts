import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { acceptedInviteAPI, deleteWorkspaceAPI, getWorkspaceAPI, postWorkspaceAPI } from "@workspace/flow/workspace/workspace.api"
import type { WorkspaceFormData } from "@workspace/models/request.schema"
import { ErrorHandler, SuccessHandle } from "@/common/ults/NotifyHandler"
import type { AxiosError } from "axios"
import type { Workspace } from "@workspace/models/response.model"
import type { AppDispatch, AppState } from "@/stores"
import { useDispatch, useSelector } from "react-redux"
import { setWorkspace } from "@workspace/store"
export const useCreateWorkspaceSvc = () => {
    const client = useQueryClient()
    return useMutation({
        mutationFn: async (data: WorkspaceFormData) => {
            const res = await postWorkspaceAPI(data)
            return res.data
        },
        onSuccess: () => {
            SuccessHandle("Workspace created!")
            client.invalidateQueries({ queryKey: ["workspace"] })
        },
        onError: (error: AxiosError) => {
            ErrorHandler(error.response?.data || error.message)
        },
    })
}
export const useGetWorkspaceSvc = () => {
    const dispatch: AppDispatch = useDispatch()
    const { currentWorkspace } = useSelector((state: AppState) => state.persist.workspace)
    return useQuery({
        queryKey: ["workspace"],
        queryFn: async () => {
            try {
                const res = await getWorkspaceAPI()

                if (res.status > 200) throw new Error(res.data.message ?? "Error")
                const data = res.data.data as Workspace[]
                if(!data.some((el : Workspace) => el.id == currentWorkspace?.id)) {
                    dispatch(setWorkspace(data[0]))
                }

                return data
            } catch (error) {
                const err = error as unknown as AxiosError
                ErrorHandler(err.message || err.response?.data || "Error when try to fetch")
            }
        },
        staleTime: 5 * 1000 * 60, //the time your data expired, and need to refetch
        gcTime: 10 * 1000 * 60, //the time your data removed
        select: (result) => result as Workspace[],
        retry: false
    })
}

export const useDeleteWorkspaceSvc = () => {
    const client = useQueryClient()
    return useMutation({
        mutationFn: async (id: string) => {
            const res = await deleteWorkspaceAPI(id)
            return res.data
        },
        onError: (error: AxiosError) => ErrorHandler(error.response?.data || "Error"),
        onSuccess: () => {
            SuccessHandle(`Delete success, all data deleted, but you can rollback in history`)
            client.invalidateQueries({ queryKey: ["workspace"] })
        }
    })
}
export const useAccepInvite = () => {
    return useMutation({
        mutationFn: async (token: string) => {
            const res = await acceptedInviteAPI(token)
            return res.data
        },
        onError: (e: AxiosError) => {
            ErrorHandler(e.response?.data || "Error")
        },
        onSuccess: () => SuccessHandle(`You joined to workspace!`),
        retry: false
    })
}