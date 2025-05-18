import LoadingFallback from "@/components/LoadingFallback.component";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
export default function BeforeEachRoute(): React.JSX.Element {
    const location = useLocation()
    return  <React.Suspense fallback={<LoadingFallback />} key={location.pathname}>  <Outlet /></React.Suspense>
   
}