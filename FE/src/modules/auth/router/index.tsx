import LoadingFallback from "@/components/LoadingFallback.component"
import React from "react"
import { Navigate, type LoaderFunctionArgs } from "react-router-dom"
import { postGetPKCEToken } from "@auth/flows/pkce/pkce.api"
const RegisterView  = React.lazy(() => {
  console.log("Start loading RegisterView");
  return import("@/modules/auth/view/Register.view").then((module) => {
    console.log("RegisterView loaded");
    return module;
  });
});
const LoginView = React.lazy(() => {
  console.log("Start loading LoginView");
  return import("@/modules/auth/view/Login.view").then((module) => {
    console.log("LoginView loaded");
    return module;
  });
});const AuthLayout = React.lazy(() => import("@/modules/auth/layouts/AuthLayout.view"))
const AuthCallback = React.lazy(() => import("@/modules/auth/view/callback/AuthCallback.view"))
const ForgotPassword = React.lazy(() => import("@/modules/auth/view/ForgotPassword.view"))
// const ResetPassword = React.lazy(() => import("@auth/view/ResetPassword"))
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
                element:  <RegisterView />
            },
            {
                path: "login",
                element: <LoginView />
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />
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
    },
    {
        path: "/auth/callback",
        element: <React.Suspense fallback={
            <div className="fixed top-0 left-0 bg-neutral-950 w-screen  h-screen flex flex-col items-center justify-center">
                Authorizing....
            </div>
        }><AuthCallback /></React.Suspense> ,
        loader: async ({ request }: LoaderFunctionArgs) => {
            const url = new URL(request.url)
            const searchParams = new URL(url).searchParams
            if (!searchParams.has("code")) throw new Error("You dont have permission here")
            await postGetPKCEToken(searchParams.get("code") ?? '')
            return true
        }
    }
]