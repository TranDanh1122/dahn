import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default React.memo(function Layout(): React.JSX.Element {
    return <div className="w-screen h-screen bg-white relative overflow-hidden">
        <Header />
        <main className="w-full h-full flex  justify-center items-center">
            <Outlet />
        </main>
    </div>
})