import type { LoaderFunctionArgs } from "react-router-dom"

const ProjectRouter =
    [
        {
            path: "project/*",
            children: [
                {
                    path: ":projectId",
                    lazy: async () => {
                        const [component, loader] = await Promise.all([
                            import("@project/view/ProjectDetail.view"),
                            import("@project/loader")
                        ])
                        return {
                            Component: component.default,
                            loader: async (args: LoaderFunctionArgs) => await loader.singleProjectLoader(args)
                        }
                    },
                    handle: { title: "Project Detail" }
                }
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