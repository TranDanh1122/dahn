const ProjectRouter =
    [
        {
            path: "project/*",
            children: [

            ]
        }
    ]
const NoSidebarProjectRouter = [
    {
        path: "project/*",
        children: [
            {
                path: "create",
                lazy: async () => {
                    const [component] = await Promise.all([
                        import("@project/view/ProjectForm.view")
                    ])
                    return { Component: component.default }
                }
            }
        ]
    }
]
export { ProjectRouter, NoSidebarProjectRouter }