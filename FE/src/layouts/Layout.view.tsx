import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout(): React.JSX.Element {
    return <div className="w-screen h-screen bg-white relative overflow-hidden">
        <Header />
        <main className="w-full h-full flex items-center justify-center">
            <Outlet />
        </main>
    </div>
}