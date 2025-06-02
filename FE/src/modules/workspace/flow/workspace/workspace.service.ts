import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
    acceptedInviteAPI,
    deleteWorkspaceAPI,
    getWorkspaceAPI,
    getWorkspaceByIDAPI,
    postWorkspaceAPI,
    putWorkspaceByIDAPI
} from "@workspace/flow/workspace/workspace.api"
import { ErrorHandler, SuccessHandle } from "@/common/ults/NotifyHandler"
import type { AxiosError } from "axios"
import type { Workspace } from "@workspace/models/response.model"
import type { AppDispatch, AppState } from "@/stores"
import { useDispatch, useSelector } from "react-redux"
import { setWorkspace } from "@workspace/store"
export const useCreateWorkspaceSvc = () => {
    const client = useQueryClient()
    return useMutation({
        mutationFn: async (data: FormData) => {
            const res = await postWorkspaceAPI(data)
            return res.data
        },
        onSuccess: () => {
            SuccessHandle("Workspace created!")
            client.invalidateQueries({ queryKey: ["workspaces"] })
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
        queryKey: ["workspaces"],
        queryFn: async () => {
            try {
                const res = await getWorkspaceAPI()

                if (res.status > 200) throw new Error(res.data.message ?? "Error")
                const data = res.data.data as Workspace[]
                if (!data.some((el: Workspace) => el.id == currentWorkspace?.id)) {
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
            client.invalidateQueries({ queryKey: ["workspaces"] })
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

export const getWorkspaceByIDQueryFn = async (id: string) => {
    if (!id) return []
    const res = await getWorkspaceByIDAPI(id)
    if (res.status > 200) throw new Error(res.data || "Error when try to get workspace")
    return res.data
}
export const useGetWorkspaceByID = (id: string) => {
    return useQuery({
        queryKey: ["workspace", id],
        queryFn: async () => getWorkspaceByIDQueryFn(id),
        retry: false,
        gcTime: 10 * 60 * 1000,
        staleTime: 3 * 60 * 1000,
        select: (result) => result as Workspace
    })
}

export const useUpdateWorkspace = () => {
    const queryClient = useQueryClient()
    const dispatch: AppDispatch = useDispatch()
    return useMutation({
        mutationFn: async ({ id, data }: { id: string, data: FormData }) => {
            const res = await putWorkspaceByIDAPI(id, data)
            return res.data
        },
        retry: false,
        onError : (e: AxiosError) => {
            ErrorHandler(e.response?.data || "Error")
        },
        onSuccess: (data : Workspace) => {
            SuccessHandle("Workspace Updated!")
            queryClient.invalidateQueries({queryKey : ["workspaces"]})
            queryClient.invalidateQueries({queryKey : ["workspace" , data.id] })
            dispatch(setWorkspace(data))
        }
    })
}