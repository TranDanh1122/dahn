import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import LoadingFallback from "@/components/LoadingFallback.component";

export default React.memo(function Layout(): React.JSX.Element {
    const location = useLocation()
    return <div className="w-screen h-screen bg-white relative overflow-hidden">
        <Header />
        <main className="w-full h-full flex  justify-center items-center">
            <React.Suspense fallback={<LoadingFallback/>} key={location.key}>   <Outlet /></React.Suspense>
         
        </main>
    </div>
})