import React from "react";
import DetailProjectContextProvider from "./context/Detail.context";
import Overview from "./components/side"
import MainDetail from "./components/main";
import type { Project } from "@project/models";
import ProjectDetailFoot from "./components/footer"
export default function DetailProject({ project }: { project: Project }): React.JSX.Element {

    return <DetailProjectContextProvider project={project}>
        <div className="flex flex-col gap-8 p-4 h-full">
            <div className="flex gap-8 h-full">
                <div className="w-5/7">
                    <MainDetail />
                </div>
                <div className="w-2/7 flex flex-col gap-5 justify-center">
                    <Overview />
                </div>
            </div>
            <div className=" col-span-5 h-52">
                <ProjectDetailFoot />
            </div>
        </div>
    </DetailProjectContextProvider>
}