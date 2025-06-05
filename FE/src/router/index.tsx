import { createBrowserRouter } from "react-router-dom"
import { AuthRouter } from "@auth"
import { WorkspaceRouter, NoSidebarWorkspaceRouter } from "@workspace/router"
import DashboardRouter from "@dashboard/router"
import { ProjectRouter, NoSidebarProjectRouter } from "@project/router"
import LoadingFallback from "@/components/LoadingFallback.component"
import { v4 } from "uuid"


const router = createBrowserRouter([
    {
        path: "/",
        lazy: async () => ({ Component: (await import("@/layouts/Layout.view")).default }),
        children: [
            ...AuthRouter,
            {
                path: "/*",
                lazy: async () => ({ Component: (await import("@/layouts/SidebarLayout/SidebarLayout")).default }),
                children: [
                    ...WorkspaceRouter,
                    ...DashboardRouter,
                    ...ProjectRouter
                ]
            },
            {
                path: "/*",
                children: [
                    ...NoSidebarProjectRouter,
                    ...NoSidebarWorkspaceRouter
                ]
            }

        ],
        hydrateFallbackElement: <LoadingFallback key={v4()} />
    },

])
export default router