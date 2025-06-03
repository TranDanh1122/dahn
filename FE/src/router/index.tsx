import { createBrowserRouter } from "react-router-dom"
import { AuthRouter } from "@auth"
import Layout from "@/layouts/Layout.view"
import { WorkspaceRouter } from "@workspace"
import { DashboardRouter } from "@dashboard"
import React from "react"
const SidebarLayout = React.lazy(() => import("@/layouts/SidebarLayout/SidebarLayout"))

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            ...AuthRouter,
            {
                path: "/*",
                element: <SidebarLayout />,
                children: [
                    ...WorkspaceRouter,
                    ...DashboardRouter
                ]
            }

        ]
    }
])
export default router