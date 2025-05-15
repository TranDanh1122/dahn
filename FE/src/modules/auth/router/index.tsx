import LoadingFallback from "@/components/LoadingFallback"
import React from "react"
const RegisterView = React.lazy(() => import("@/modules/auth/view/Register"))
const AuthLayout = React.lazy(() => import("@auth/layouts/AuthLayout"))
const AuthCallback = React.lazy(() => import("@auth/view/AuthCallback"))
export const AuthRouter = [
    {
        path: "auth",
        element: <React.Suspense fallback={<LoadingFallback />}> <AuthLayout />  </React.Suspense>,
        children: [
            {
                path: "register",
                element: <RegisterView />
            },
            {
                path: "callback",
                element: <AuthCallback />
            }
        ]
    }
]