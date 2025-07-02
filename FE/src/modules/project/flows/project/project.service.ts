import { useMutation, useQuery } from "@tanstack/react-query"
import { createProjectAPI, deleteProjectAPI, getProjectAPI, updateGeneralInfoAPI } from "./project.api"
import { type ProjectData, type ProjectResDataType, step1Schema } from "@project/models"
import { ErrorHandler, SuccessHandle } from "@/common/ults/NotifyHandler"
import type { HTTPError } from "ky"
import queryClient from "@/common/ults/QueryClient.const"
import type { z } from "zod"

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

export const useDeleteProjectMutation = () => {
    return useMutation({
        mutationFn: async (projectId: string) => {
            const res = await deleteProjectAPI(projectId)
            const json = await res.json<ProjectResDataType>()
            console.log(json)
            return json.data
        },
        onSuccess: (data) => {
            SuccessHandle(`Project ${data.name} deleted`)
            queryClient.invalidateQueries({ queryKey: ["projects", data.workspaceID] })
        },
        onError: async (e: HTTPError) => {
            const body = await e.response.json<{ message: string }>()
            ErrorHandler(body.message || e.message)
        },
        retry: 0
    })
}

export const useUpdateGeneralInfoMutation = () => {
    return useMutation({
        mutationFn: async ({ projectId, data }: { projectId: string, data: z.infer<typeof step1Schema> }) => {
            const res = await updateGeneralInfoAPI(projectId, data)
            const json = await res.json<ProjectResDataType>()
            return json.data
        },
        onSuccess: (data) => {
            SuccessHandle(`Project ${data.name} updated`)
            queryClient.invalidateQueries({ queryKey: ["project", data.id] })
        },
        onError: async (e: HTTPError) => {
            const body = await e.response.json<{ message: string }>()
            ErrorHandler(body.message || e.message)
        }
    })
}