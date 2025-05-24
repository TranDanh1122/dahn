import React from "react"

const WorkspaceLayout = React.lazy(() => import("@workspace/layout/WorkspaceLayout"))
const WorkspaceRouter = [
    {
        element: <WorkspaceLayout />,
        path: "",
        children: [

        ]
    }
]
export default WorkspaceRouter