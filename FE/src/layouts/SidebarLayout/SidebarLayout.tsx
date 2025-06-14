import React from "react";
import Sidebar from "@/layouts/SidebarLayout/components/Sidebar.component";
import Header from "./components/Header.component";
import Content from "./components/Content.component";

export default React.memo(function SidebarLayout(): React.JSX.Element {
    return <main className="grid grid-cols-6 gap-x-20 w-screen h-screen pr-20">
        <div className=" col-span-1 h-screen">
            <Sidebar />
        </div>
        <div className="col-span-5">
            <Header />
            <Content />
        </div>
    </main>
})