import { useQuery } from "@tanstack/react-query"
import { getTechstacks } from "./techstack.api"
import { ErrorHandler } from "@/common/ults/NotifyHandler"
import type { AxiosError } from "axios"

export const useGetTechstacksSvc = () => {
    return useQuery({
        queryKey: ["techstack"],
        queryFn: async () => {
            try {
                const res = await getTechstacks()
                if (res.status > 200) throw new Error("Error when try to get techstacks")
                return res.data
            } catch (error: unknown) {
                const axiosError = error as AxiosError;
                ErrorHandler(
                    (axiosError.response?.data as string) ||
                    axiosError.message ||
                    "Error"
                );
            }

        }
    })
}