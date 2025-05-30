import React from "react"
import { Navigate, type LoaderFunctionArgs } from "react-router-dom"
import getParamLoader from "@/loaders/getParam.loader"

const RegisterView = React.lazy(() => import("@/modules/auth/view/Register.view"));
const LoginView = React.lazy(() => import("@/modules/auth/view/Login.view"));
const AuthCallback = React.lazy(() => import("@/modules/auth/view/callback/AuthCallback.view"))
const ForgotPassword = React.lazy(() => import("@/modules/auth/view/ForgotPassword.view"))
const ResetPassword = React.lazy(() => import("@auth/view/ResetPassword.view"))
const AuthLayout = React.lazy(() => import("@auth/layout/AuthLayout"))
const OTPModal = React.lazy(() => import("@auth/view/OTPModal.view"))

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
                element: <RegisterView />,
                children: [
                    {
                        path: "2fa",
                        element: <OTPModal />
                    }
                ]
            },
            {
                path: "login",
                element: <LoginView />,
                children: [
                    {
                        path: "2fa",
                        element: <OTPModal />,
                    }
                ]

            },
            {
                path: "forgot-password",
                element: <ForgotPassword />
            },
            {
                path: "reset-password",
                element: <ResetPassword />,
                loader: (arg: LoaderFunctionArgs) => getParamLoader(arg, "code")
            }
        ]
    },
    {
        path: "/auth/callback",
        element: <AuthCallback />,
        loader: (arg: LoaderFunctionArgs) => getParamLoader(arg, "code")
    }
]