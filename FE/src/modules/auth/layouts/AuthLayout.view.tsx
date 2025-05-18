import React from "react";
import { Outlet } from "react-router-dom";
import SocialAuth from "@auth/components/SocialAuth";

export default function AuthLayout(): React.JSX.Element {
    return <div className="w-screen h-screen bg-white relative overflow-hidden">
        <header className="w-full relative">
            <img src="/images/logo.png" alt="dahn logo" className="size-30 object-cover aspect-square absolute top-0 left-0" />
        </header>
        <main className="w-full h-full flex items-center justify-center">

            <div className="flex flex-col lg:w-1/5 gap-10">
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
                    <Outlet/>
                </div>
            </div>
        </main>
    </div>
}