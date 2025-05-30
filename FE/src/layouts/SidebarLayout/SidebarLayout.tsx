import React from "react";
import Sidebar from "@/layouts/SidebarLayout/Sidebar";
import { Outlet } from "react-router-dom"
import { useMatches } from "react-router-dom";
interface SidebarLayoutProps {
    rightHeadContent?: React.ReactElement
}
export default function SidebarLayout({ rightHeadContent }: SidebarLayoutProps): React.JSX.Element {
    const matches = useMatches()
    const data = matches[matches.length - 1] as { handle?: { title?: string } }
    return <main className="grid grid-cols-6 gap-x-20 w-screen h-screen pr-20">
        <div className=" col-span-1 h-screen">
            <Sidebar />
        </div>
        <div className="col-span-5">
            <header className="w-full sticky bg-white h-max p-4 ">
                <div className="flex items-center justify-between">
                    <h1 className="font-light text-lg">{data.handle?.title ?? "All project"}</h1>
                    {rightHeadContent}
                </div>
                <hr className="text-neutral-300 mt-4" />

            </header>
            {<Outlet />}
        </div>
    </main>
}