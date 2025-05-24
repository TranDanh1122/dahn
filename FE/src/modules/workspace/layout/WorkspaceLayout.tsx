import React from "react";
import Sidebar from "@workspace/layout/Sidebar";
export default function WorkspaceLayout(): React.JSX.Element {
    return <main className="grid grid-cols-6 gap-x-8 w-screen h-screen">
        <div className=" col-span-1 h-screen">
            <Sidebar/>
        </div>
        <div className="bg-blue-200 col-span-5">

        </div>
    </main>
}