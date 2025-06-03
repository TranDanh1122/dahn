import React from "react";
import { Outlet } from "react-router-dom";
import LoadingFallback from "@components/LoadingFallback.component";

export default React.memo(function Layout(): React.JSX.Element {

    return <div className="w-screen h-screen  relative overflow-hidden">
        <React.Suspense fallback={<LoadingFallback />} >   <Outlet /></React.Suspense>
    </div>
})