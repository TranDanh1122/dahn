import React from "react"
import { Navigate, type LoaderFunctionArgs } from "react-router-dom"

const RegisterView = React.lazy(() => import("@/modules/auth/view/Register.view"));
const LoginView = React.lazy(() => import("@/modules/auth/view/Login.view"));
const AuthCallback = React.lazy(() => import("@/modules/auth/view/callback/AuthCallback.view"))
const ForgotPassword = React.lazy(() => import("@/modules/auth/view/ForgotPassword.view"))
const ResetPassword = React.lazy(() => import("@auth/view/ResetPassword.view"))
const AuthLayout = React.lazy(() => import("@auth/layout/AuthLayout"))

export const AuthRouter = [
    {
        path: "auth",
        element: <AuthLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="login" replace />
            },
            {
                path: "register",
                element: <React.Suspense><RegisterView /></React.Suspense>
            },
            {
                path: "login",
                element: <React.Suspense><LoginView /></React.Suspense>
                //if we dont have suspense here, it should work, 
                // but AuthLayout out will re-render multiple time, i dont know why, but it took me 1 day to find out this shit
            },
            {
                path: "forgot-password",
                element:  <React.Suspense><ForgotPassword /></React.Suspense>
            },
            {
                path: "reset-password",
                element: <React.Suspense> <ResetPassword /></React.Suspense>,
                loader: async ({ request }: LoaderFunctionArgs) => {
                    const url = new URL(request.url)
                    const searchParams = new URL(url).searchParams
                    if (!searchParams.has("code")) throw new Error("You dont have permission here")
                    return { code: searchParams.get("code") }
                }
            }
        ]
    },
    {
        path: "/auth/callback",
        element: <React.Suspense><AuthCallback /></React.Suspense>,
        loader: async ({ request }: LoaderFunctionArgs) => {
            const url = new URL(request.url)
            const searchParams = new URL(url).searchParams
            if (!searchParams.has("code")) throw new Error("You dont have permission here")
            return { code: searchParams.get("code") }
        }
    }
]