import { useMutation } from "@tanstack/react-query"
import { createProjectAPI } from "./project.api"
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

