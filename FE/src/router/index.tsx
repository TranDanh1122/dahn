import { createBrowserRouter } from "react-router-dom"
import { AuthRouter } from "@/modules/auth"
import Layout from "@/layouts/Layout.view"
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