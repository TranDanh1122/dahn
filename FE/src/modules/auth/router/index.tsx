import React from "react"
import { Navigate, type LoaderFunctionArgs } from "react-router-dom"
import { postGetPKCEToken } from "@auth/flows/pkce/pkce.api"
const RegisterView = React.lazy(() => import("@/modules/auth/view/Register.view"));
const LoginView = React.lazy(() => import("@/modules/auth/view/Login.view"));
const AuthCallback = React.lazy(() => import("@/modules/auth/view/callback/AuthCallback.view"))
const ForgotPassword = React.lazy(() => import("@/modules/auth/view/ForgotPassword.view"))
const ResetPassword = React.lazy(() => import("@auth/view/ResetPassword.view"))
const AuthLayout = React.lazy(() => import("@auth/layout/AuthLayout") )
export const AuthRouter = [
    {
        path: "auth",
        element : <AuthLayout />,
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
                path: "reset-password",
                element: <ResetPassword />,
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
        element: <React.Suspense fallback={
            <div className="fixed top-0 left-0 bg-neutral-950 w-screen  h-screen flex flex-col items-center justify-center">
                Authorizing....
            </div>
        }><AuthCallback /></React.Suspense>,
        loader: async ({ request }: LoaderFunctionArgs) => {
            const url = new URL(request.url)
            const searchParams = new URL(url).searchParams

            if (!searchParams.has("code")) throw new Error("You dont have permission here")
            await postGetPKCEToken(searchParams.get("code") ?? '')
            return true
        }
    }
]