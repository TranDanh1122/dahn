import React from "react";
import SocialAuth from "@auth/components/SocialAuth";
import { Outlet, useLocation } from "react-router-dom";
import LoadingComponent from "@/components/Loading.component";
export default function AuthLayout(): React.JSX.Element {
    const location = useLocation()
    //if we dont have suspense Outlet here, it should work,
    // but AuthLayout will re-render multiple time, because my parent suspense will re-render it too
    return <div className="lg:w-1/5 md:w-1/3 w-screen px-2 sm:px-0 space-y-10">
        <div className="space-y-2">
            <h1 className="text-neutral-950 text-2xl font-bold">
                Simple Management Tool
            </h1>
            <h2 className="text-neutral-400 text-xl font-bold">
                The first, wait the minutes! Who are you?
            </h2>
        </div>
        <div className="space-y-10">
            <SocialAuth />
            <React.Suspense fallback={<LoadingComponent className="border-neutral-500! size-10! border-s-2!" />} key={location.key}>
                <Outlet />
            </React.Suspense>

        </div>
    </div>
}