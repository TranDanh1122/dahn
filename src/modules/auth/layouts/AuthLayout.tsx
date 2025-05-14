import React from "react";
import { Outlet } from "react-router-dom";
export default function AuthLayout(): React.JSX.Element {
    return <div className="w-screen h-screen bg-white relative overflow-hidden">
        <main className="w-full h-full flex items-center justify-center">
            <div className="flex flex-col lg:w-1/5">
                <div className="space-y-2">
                    <h1 className="text-neutral-950 text-2xl font-bold">
                        Simple Management Tool
                    </h1>
                    <h2 className="text-neutral-400 text-xl font-bold">
                        The first, wait the minutes! Who are you?
                    </h2>
                </div>
                <Outlet />
            </div>


        </main>

        <footer className="absolute -bottom-100 left-0">
            <h1 className="text-neutral-950 text-[.1px] font-bold">This might be the last line of code I write before becoming a taxi driver (man’s gotta eat) — but I still hope it makes this industry better</h1>
            <p className="text-neutral-950 text-[.1px] font-medium">No Vibecoders</p>
            <p className="text-neutral-950 text-[.1px] font-medium">No Interview Champions</p>
            <p className="text-neutral-950 text-[.1px] font-medium">No CV Developers</p>
            <p className="text-neutral-950 text-[.1px] font-medium">No Talk-no-Jutsu Leaders</p>
            <h2 className="text-neutral-950 text-[.1px] font-bold">We chill and we code, like how old-school coders MUST be — by hand, by mind, by soul</h2>
        </footer>

    </div>
}