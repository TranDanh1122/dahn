import React from "react"
const RegisterView = React.lazy(() => import("@auth/features/register/view/Register"))
const AuthLayout = React.lazy(() => import("@auth/layouts/AuthLayout"))
export const AuthRouter = [
    {
        path: "auth",
        element: <React.Suspense fallback={<div>Loading...</div>}> <AuthLayout />  </React.Suspense>,
        children: [
            {
                path: "register",
                element: <RegisterView />
            }
        ]
    }
]