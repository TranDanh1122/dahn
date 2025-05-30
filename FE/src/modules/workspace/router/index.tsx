import getParamLoader from "@/loaders/getParam.loader"
import React from "react"
import type { LoaderFunctionArgs } from "react-router-dom"

const SidebarLayout = React.lazy(() => import("@/layouts/SidebarLayout/SidebarLayout"))
const WorkspaceForm = React.lazy(() => import("@workspace/view/WorkspaceForm.view"))
const InvitedCallback = React.lazy(() => import("@/modules/workspace/view/InvitedCallback.view"))
// const WorkspaceDetail = React.lazy(() => import("@workspace/view/WorkspaceDetail.view"))
const WorkspaceRouter = [
    {
        element: <SidebarLayout />,
        path: "workspace",
        children: [
            {
                element: <WorkspaceForm />,
                path: "create"
            },

        ]
    },
    {
        element: <InvitedCallback />,
        path: "workspace/invite-accepted",
        loader: (arg: LoaderFunctionArgs) => getParamLoader(arg, "token")
    }
]
export default WorkspaceRouter