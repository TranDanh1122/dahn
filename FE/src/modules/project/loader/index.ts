import type { LoaderFunctionArgs } from "react-router-dom";
import queryClient from "@/common/ults/QueryClient.const"
import { getProjectAPIQuery } from "../flows/project/project.service";

export const singleProjectLoader = async (args: LoaderFunctionArgs) => {
    const projectId = args.params.projectId
    if (!projectId) throw new Error("Project Id not correct")
    await queryClient.ensureQueryData({
        queryKey: ["project", projectId],
        queryFn: async () => await getProjectAPIQuery(projectId),
        retry: 0
    })
    return { projectId }
}
