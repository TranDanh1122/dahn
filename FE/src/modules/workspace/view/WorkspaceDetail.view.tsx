import React from "react";
import { ProjectList } from "@project";
import { WorkspaceItem } from "@workspace/components/WorkspaceList";
import Button from "@components/Button.component";
import { useSelector } from "react-redux";
import type { AppState } from "@/stores";
import { useNavigate, useParams } from "react-router-dom";
export default function WorkspaceDetail(): React.JSX.Element {
    const navigate = useNavigate()
    const workspace = useSelector((state: AppState) => state.persist.workspace.currentWorkspace)
    const { workspaceId } = useParams()
    React.useEffect(() => {
        if (workspace && workspaceId != workspace.id) navigate(`/workspace/${workspace.id}`)
    }, [workspace])
    return <>
        <div className="w-full flex items-center justify-between">
            <WorkspaceItem
                className="[&__img]:size-12! [&__img]:rounded-md [&__p]:text-lg! [&__p]:tracking-widest [&__p]:font-bold! [&__p]:ml-2! w-1/2 hover:bg-white"
                disableDropdown />
            <Button className="bg-blue-500 font-light! text-white text-sm">+ Project</Button>
        </div>

        <ProjectList />
    </>
}