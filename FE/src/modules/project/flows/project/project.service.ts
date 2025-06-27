import { useMutation, useQuery } from "@tanstack/react-query"
import { createProjectAPI, getProjectAPI } from "./project.api"
import type { ProjectData, ProjectResDataType } from "@project/models"
import { ErrorHandler, SuccessHandle } from "@/common/ults/NotifyHandler"
import type { HTTPError } from "ky"
import queryClient from "@/common/ults/QueryClient.const"

export const useCreateProjectMutation = () => {
    return useMutation({
        mutationFn: async (data: ProjectData) => {
            const res = await createProjectAPI(data)
            return await res.json()
        },
        onSuccess: (_, req) => {
            queryClient.invalidateQueries({ queryKey: ["projects", req.workspaceID] })
            SuccessHandle("Create Project Successfully")
        },
        onError: async (e: HTTPError) => {
            const body = await e.response.json<{ message: string }>()
            ErrorHandler(body.message || e.message)
        }
    })
}
export const getProjectAPIQuery = async (projectId: string) => {
    const res = await getProjectAPI(projectId)
    const json = await res.json<ProjectResDataType>()
    return json.data
}

export const useGetProjectQuery = (projectId: string) => {
    return useQuery({
        queryKey: ["project", projectId],
        queryFn: async () => await getProjectAPIQuery(projectId),
        staleTime: 5 * 60 * 1000,
        retry: false
    })
} 