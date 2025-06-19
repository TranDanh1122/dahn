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
export const getProjectAPIQuery = async (projectId: string) => {
    const res = await getProjectAPI(projectId)
    return res.json<{ message: string, success: boolean, data: ProjectData }>()
}

export const useGetProjectQuery = (projectId: string) => {
    return useQuery({
        queryKey: ["project", projectId],
        queryFn: async () => await getProjectAPIQuery(projectId),
        retry: false
    })
} 