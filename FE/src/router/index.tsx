import { createBrowserRouter } from "react-router-dom"
import { AuthRouter } from "@/modules/auth"
import React from "react"
const Layout = React.lazy(() => import("@/layouts/Layout.view"))

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            ...AuthRouter
        ]
    }
])
export default router