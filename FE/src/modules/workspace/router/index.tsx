import getParamLoader from "@/loaders/getParam.loader"
import React from "react"
import type { LoaderFunctionArgs } from "react-router-dom"
import { loadWorkspaceById } from "@workspace/loader"
// const SidebarLayout = React.lazy(() => import("@/layouts/SidebarLayout/SidebarLayout"))
const WorkspaceForm = React.lazy(() => import("@workspace/view/WorkspaceForm.view"))
const InvitedCallback = React.lazy(() => import("@workspace/view/InvitedCallback.view"))
// const WorkspaceDetail = React.lazy(() => import("@workspace/view/WorkspaceDetail.view"))
const WorkspaceRouter = [
    {

        path: "workspace",
        children: [
            {
                element: <InvitedCallback />,
                path: "invite-accepted",
                loader: (arg: LoaderFunctionArgs) => getParamLoader(arg, "token")
            },
            {
                element: <WorkspaceForm />,
                path: "create"
            },
            {
                element: <WorkspaceForm />,
                path: ":workspaceId/edit",
                loader: loadWorkspaceById
            }
        ]
    },

]
export default WorkspaceRouter