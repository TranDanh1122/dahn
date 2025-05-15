import { createBrowserRouter } from "react-router-dom"
import BeforeEachRoute from "./BeforeEachRoute"
import { AuthRouter } from "@/modules/auth"
const router = createBrowserRouter([
    {
        path: "/",
        element: <BeforeEachRoute />,
        children: [
            ...AuthRouter
        ]
    }
])
export default router