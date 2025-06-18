import { useMutation, useQuery } from "@tanstack/react-query"
import { createProjectAPI, getProjectAPI } from "./project.api"
import type { ProjectData } from "@project/models/request.schema"
import { ErrorHandler, SuccessHandle } from "@/common/ults/NotifyHandler"
import type { HTTPError } from "ky"

export const useCreateProjectMutation = () => {
    return useMutation({
        mutationFn: async (data: ProjectData) => {
            const res = await createProjectAPI(data)
            return await res.json()
        },
        onSuccess: () => {
            SuccessHandle("Create Project Successfully")
        },
        onError: async (e: HTTPError) => {
            const body = await e.response.json<{ message: string }>()
            ErrorHandler(body.message || e.message)
        }
    })
}

export const getProjectByWorkspaceID = async (workspaceID: string) => {
    const res = await getProjectAPI({ workspaceID })
    const data = await res.json<{ data: ProjectData[] }>()
    if (res.status > 200) throw new Error("Error when try to fetch Data")
    return data.data
}

export const useGetProject = (workspaceID: string) => {
    return useQuery({
        queryKey: ["projects", workspaceID],
        queryFn: async () => await getProjectByWorkspaceID(workspaceID),
        staleTime: 3 * 1000 * 60,
        gcTime: 10 * 1000 * 60,
        retry: 0
    })
} 