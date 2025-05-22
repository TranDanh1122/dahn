import React from "react";
import SocialAuth from "@auth/components/SocialAuth";
import { Outlet } from "react-router-dom";
export default function AuthLayout(): React.JSX.Element {
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
            <Outlet />
        </div>
    </div>
}