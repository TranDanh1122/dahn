import React from "react";
import { ProjectList } from "@project";
import { WorkspaceItem } from "@workspace/components/WorkspaceList";
export default function WorkspaceDetail(): React.JSX.Element {

    return <>
        <div className="w-full">
            <WorkspaceItem
                className="[&__img]:size-12! [&__img]:rounded-md [&__p]:text-base! [&__p]:font-bold! [&__p]:ml-2! w-1/2 hover:bg-white"
                disableDropdown />
        </div>


        {/* <ProjectList /> */}
    </>
}