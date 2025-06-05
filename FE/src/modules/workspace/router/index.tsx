
import type { LoaderFunctionArgs } from "react-router-dom"



/**
 * we have new feature of router dom v7 here
 * no need deferloading all router => use lazy instead
 */
const WorkspaceRouter = [
    {
        path: "workspace/*",
        children: [
            {
                path: "invite-accepted",
                lazy: async () => {
                    const [component, loader] = await Promise.all([
                        import("@workspace/view/InvitedCallback.view"),
                        import("@/loaders/getParam.loader")
                    ])
                    return {
                        Component: component.default,
                        loader: async (arg: LoaderFunctionArgs) => loader.default(arg, "token")
                    }
                }
            },

            {
                path: ":workspaceId/projects",
                handle: { title: "Workspace's Project" },
                lazy: async () => {
                    const component = await import("@workspace/view/WorkspaceDetail.view")
                    return { Component: component.default, }
                }
            }
        ]
    },

]
const NoSidebarWorkspaceRouter = [
    {
        path: "workspace/*",
        children: [
            {
                path: "create",
                lazy: async () => {
                    const [component] = await Promise.all([
                        import("@workspace/view/WorkspaceForm.view"),
                        import("@workspace/view/form/Step1.view")
                    ])
                    return { Component: component.default }
                }
            },
            {
                path: ":workspaceId/edit",
                lazy: async () => {
                    const [component, loader] = await Promise.all([
                        import("@workspace/view/WorkspaceForm.view"),
                        import("@workspace/loader")
                    ])
                    return {
                        Component: component.default,
                        loader: loader.loadWorkspaceById
                    }
                }
            }
        ]
    }
]
export { WorkspaceRouter, NoSidebarWorkspaceRouter } 