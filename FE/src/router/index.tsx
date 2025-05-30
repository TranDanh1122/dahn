import { createBrowserRouter } from "react-router-dom"
import { AuthRouter } from "@/modules/auth"
import Layout from "@/layouts/Layout.view"
import { WorkspaceRouter } from "@/modules/workspace"
import { DashboardRouter } from "@/modules/dashboard"
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            ...AuthRouter,
            ...WorkspaceRouter,
            ...DashboardRouter
        ]
    }
])
export default router