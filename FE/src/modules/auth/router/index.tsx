import { Navigate, type LoaderFunctionArgs } from "react-router-dom";

export const AuthRouter = [
    {
        path: "auth",
        lazy: async () => ({
            Component: (await import("@auth/layout/AuthLayout")).default,
        }),
        children: [
            {
                index: true,
                lazy: async () => ({
                    Component: () => <Navigate to="/auth/login" replace />,
                })
            },
            {
                path: "register",
                lazy: async () => ({
                    Component: (await import("@auth/view/Register.view")).default,
                }),
                children: [
                    {
                        path: "2fa",
                        lazy: async () => ({
                            Component: (await import("@auth/view/OTPModal.view")).default,
                        }),
                    },
                ],
            },
            {
                path: "login",
                lazy: async () => ({
                    Component: (await import("@auth/view/Login.view")).default,
                }),

                children: [
                    {
                        path: "2fa",
                        lazy: async () => ({
                            Component: (await import("@auth/view/OTPModal.view")).default,
                        }),
                    },
                ],
            },
            {
                path: "forgot-password",
                lazy: async () => ({
                    Component: (await import("@auth/view/ForgotPassword.view")).default,
                }),
            },
            {
                path: "reset-password",
                lazy: async () => {
                    const [component, loader] = await Promise.all([
                        import("@auth/view/ResetPassword.view"),
                        import("@/loaders/getParam.loader"),
                    ]);
                    return {
                        Component: component.default,
                        loader: async (args: LoaderFunctionArgs) => loader.default(args, "code"),
                    };
                },
            },
        ],
    },
    {
        path: "/auth/callback",
        lazy: async () => {
            const [component, loader] = await Promise.all([
                import("@auth/view/callback/AuthCallback.view"),
                import("@/loaders/getParam.loader"),
            ]);
            return {
                Component: component.default,
                loader: (args: LoaderFunctionArgs) => loader.default(args, "code"),
            };
        },
    },
];
