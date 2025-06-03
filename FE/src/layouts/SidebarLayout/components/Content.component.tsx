import LoadingFallback from "@components/LoadingFallback.component";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
export default React.memo(function Content(): React.JSX.Element {
    const location = useLocation()
    return (
        <React.Suspense key={location.pathname} fallback={<LoadingFallback />}>
            <Outlet />
        </React.Suspense>
    );
});
