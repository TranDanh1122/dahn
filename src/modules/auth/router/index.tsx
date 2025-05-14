import React from "react"
const RegisterView = React.lazy(() => import("@auth/features/register/view/Register"))
export const AuthRouter = [
    {
        path: "register",
        element: <React.Suspense fallback={<div>Loading...</div>}>
            <RegisterView />
        </React.Suspense>
    }
]