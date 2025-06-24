import React from "react";
import Overview from "./components/side"
import MainDetail from "./components/main";
import { ProjectContext } from "./context/Detail.context";
import FooterItemComponent from "./components/FooterItem.component";
import { v4 } from "uuid";
export default function DetailProject(): React.JSX.Element {
    const project = React.useContext(ProjectContext);

    return <>
        <div className="space-y-8 p-4 h-full">
            <div className="flex gap-20 h-[calc(100%-13rem)]">
                <div className="w-5/7 h-full overflow-y-auto scrollbar-thin">
                    <MainDetail />
                </div>
                <div className="w-2/7 shrink-0 space-y-5">
                    <Overview />
                </div>
            </div>
            <div className="flex items-center justify-evenly h-44">
                {project?.environment?.map((env) => <FooterItemComponent key={v4()} env={env} />)}
            </div>
        </div>
    </>

}