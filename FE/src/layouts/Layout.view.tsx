import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import LoadingFallback from "@components/LoadingFallback.component";

export default React.memo(function Layout(): React.JSX.Element {
    const location = useLocation()
    return <div className="w-screen h-screen  relative overflow-hidden">
        <React.Suspense fallback={<LoadingFallback />} key={location.key}>   <Outlet /></React.Suspense>
    </div>
})