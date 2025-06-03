import React from "react"
const ProjectForm = React.lazy(() => import("@project/view/ProjectForm.view"))
const ProjectRouter =
    [
        {
            path: "project/*",
            children: [
                {
                    element: <ProjectForm />,
                    path: "create"
                }
            ]
        }
    ]

export default ProjectRouter