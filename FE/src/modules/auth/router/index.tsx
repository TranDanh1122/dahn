import LoadingFallback from "@/components/LoadingFallback"
import React from "react"
import  {  Navigate } from "react-router-dom"
const RegisterView = React.lazy(() => import("@auth/view/Register"))
const LoginView = React.lazy(() => import("@auth/view/Login"))
const AuthLayout = React.lazy(() => import("@auth/layouts/AuthLayout"))
const AuthCallback = React.lazy(() => import("@/modules/auth/view/callback/AuthCallback"))
const ForgotPassword = React.lazy(() => import("@auth/view/ForgotPassword"))
// const ResetPassword = React.lazy(() => import("@auth/view/ResetPassword"))
export const AuthRouter = [
    {
        path: "auth",
        element: <React.Suspense fallback={<LoadingFallback />}> <AuthLayout />  </React.Suspense>,
        children: [
            {
                index: true,
                element: <Navigate to="login" replace />
            },
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
            },
            // {
            //     path: "reset-password",
            //     element: <ResetPassword />,
            //     loader: async ({ request }: LoaderFunctionArgs) => {
            //         const url = new URL(request.url)
            //         const searchParams = new URL(url).searchParams
            //         if (!searchParams.has("ticket")) throw new Error("You dont have permission here")
            //         return {ticket : searchParams.get("ticket") ,  }
            //     }
            // }
        ]
    }
]