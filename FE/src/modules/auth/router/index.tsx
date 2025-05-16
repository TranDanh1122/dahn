import LoadingFallback from "@/components/LoadingFallback"
import React from "react"
const RegisterView = React.lazy(() => import("@auth/view/Register"))
const LoginView = React.lazy(() => import("@auth/view/Login"))
const AuthLayout = React.lazy(() => import("@auth/layouts/AuthLayout"))
const AuthCallback = React.lazy(() => import("@auth/view/AuthCallback"))
const ForgotPassword = React.lazy(() => import("@auth/view/ForgotPassword"))
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
                path: "login",
                element: <LoginView />
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />
            },
            {
                path: "callback",
                element: <AuthCallback />
            }
        ]
    }
]