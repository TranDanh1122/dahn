import React from "react"

const WorkspaceLayout = React.lazy(() => import("@workspace/layout/WorkspaceLayout"))
const WorkspaceForm = React.lazy(() => import("@workspace/view/WorkspaceForm.view") )
const WorkspaceRouter = [
    {
        element: <WorkspaceLayout />,
        path: "",
        children: [
            {
                element : <WorkspaceForm/>,
                path: "create-workspace"
            }
        ]
    }
]
export default WorkspaceRouter