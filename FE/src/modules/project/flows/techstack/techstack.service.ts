import { useQuery } from "@tanstack/react-query"
import { getTechstacks } from "./techstack.api"
import { ErrorHandler } from "@/common/ults/NotifyHandler"
import type { HTTPError } from "ky"

export const useGetTechstacksSvc = () => {
    return useQuery({
        queryKey: ["techstack"],
        queryFn: async () => {
            try {
                const res = await getTechstacks()
                if (res.status > 200) throw new Error("Error when try to get techstacks")
                return await res.json<string[]>()
            } catch (error) {
                const axiosError = error as unknown as HTTPError;
                const body = await axiosError.response.json<{ message: string }>();
                ErrorHandler(body.message)
            }
        }
    })
}