import React from "react";
import SocialAuth from "@auth/components/SocialAuth";
import { Outlet, useLocation } from "react-router-dom";
import LoadingComponent from "@components/Loading.component";
import Header from "./Header";
export default function AuthLayout(): React.JSX.Element {
    const location = useLocation()
    //if we dont have suspense Outlet here, it should work,
    // but AuthLayout will re-render multiple time, because my parent suspense will re-render it too
    return <>
        <Header />
        <main className="w-full h-full flex justify-center items-center text-sm">
            <div className="lg:w-1/5 md:w-1/3 w-screen px-2 sm:px-0 space-y-10">
                <div className="space-y-2">
                    <h1 className="text-slate-950 text-2xl font-bold">
                        Simple Management Tool
                    </h1>
                    <h2 className="text-slate-400 text-lg font-bold">
                        The first, wait the minutes! Who are you?
                    </h2>
                </div>
                <div className="space-y-10">
                    <SocialAuth />
                    <React.Suspense fallback={<LoadingComponent className="border-slate-500! size-10! border-s-2!" />} key={location.key}>
                        <Outlet />
                    </React.Suspense>

                </div>
            </div>
        </main>
    </>
}