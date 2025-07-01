import React from "react";
import Content from "./components/Content.component";
import SkeletonComponent from "@/components/Skeleton.component";
const Sidebar = React.lazy(() => import("./components/Sidebar.component"))
const Header = React.lazy(() => import("./components/Header.component"))
export default React.memo(function SidebarLayout(): React.JSX.Element {
    return <main className="grid grid-cols-6 gap-x-20 w-screen h-screen pr-20">
        <div className=" col-span-1 h-screen py-2">
            <React.Suspense
                fallback={
                    <SkeletonComponent className="h-full w-full bg-slate-100 rounded-e-2xl" />
                }>
                <Sidebar />
            </React.Suspense>
        </div>
        <div className="col-span-5 h-screen">
            <React.Suspense
                fallback={
                    <SkeletonComponent className="h-15 w-full bg-slate-100 rounded-e-2xl" />
                }>
                <Header />
            </React.Suspense>

            <Content />
        </div>
    </main>
})