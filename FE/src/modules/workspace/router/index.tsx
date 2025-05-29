import React from "react"

const WorkspaceLayout = React.lazy(() => import("@workspace/layout/WorkspaceLayout"))
const WorkspaceForm = React.lazy(() => import("@workspace/view/WorkspaceForm.view"))
// const WorkspaceDetail = React.lazy(() => import("@workspace/view/WorkspaceDetail.view"))
const Dashboard = React.lazy(() => import("@/modules/dashboard/view/Dashboard.view"))
const WorkspaceRouter = [
    {
        element: <WorkspaceLayout />,
        path: "",
        children: [
            {
                index: true,
                element: <Dashboard />,
                handle: { title: "All Project" }
            },
            {
                element: <WorkspaceForm />,
                path: "create-workspace"
            }
        ]
    }
]
export default WorkspaceRouter