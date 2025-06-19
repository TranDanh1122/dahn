import NavigationLoader from "@components/NavigationLoader.component";
import React from "react";
import { Outlet } from "react-router-dom";

export default React.memo(function Layout(): React.JSX.Element {

    return <div className="w-screen h-screen  relative bg-[url('/images/project_detail_bg.jpg')] ">
        <NavigationLoader />
        <Outlet />
    </div>
})