import React from "react"

const SidebarLayout = React.lazy(() => import("@/layouts/SidebarLayout/SidebarLayout"))
const WorkspaceForm = React.lazy(() => import("@workspace/view/WorkspaceForm.view"))
// const WorkspaceDetail = React.lazy(() => import("@workspace/view/WorkspaceDetail.view"))
const WorkspaceRouter = [
    {
        element: <SidebarLayout />,
        path: "workspace",
        children: [
            {
                element: <WorkspaceForm />,
                path: "create"
            }
        ]
    }
]
export default WorkspaceRouter