import { getWorkspaceByIDQueryFn } from "@workspace/flow/workspace/workspace.service"
import type { LoaderFunctionArgs } from "react-router-dom"
import queryClient from "@/common/ults/QueryClient.const"

async function loadWorkspaceById(args: LoaderFunctionArgs) {
    const { workspaceId } = args.params
    if (!workspaceId) throw new Error("No workspace found")
    const queryKey = ["workspace", workspaceId]
    const queryFn = async () => getWorkspaceByIDQueryFn(workspaceId)
    await queryClient.ensureQueryData({ queryKey, queryFn })
    return { workspaceId: workspaceId }
}
export { loadWorkspaceById }