import { createBrowserRouter } from "react-router-dom"
import { AuthRouter } from "@auth"
import Layout from "@/layouts/Layout.view"
import { WorkspaceRouter } from "@workspace"
import { DashboardRouter } from "@dashboard"
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