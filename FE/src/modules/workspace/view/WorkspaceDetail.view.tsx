import React from "react";
import { ProjectList } from "@project";
import { WorkspaceItem } from "@workspace/components/WorkspaceList";
import Button from "@components/Button.component";
import { useSelector } from "react-redux";
import type { AppState } from "@/stores";
import { useNavigate, useParams } from "react-router-dom";
import { BreadscrumContext } from "@/context/Breadscrum.context";
export default function WorkspaceDetail(): React.JSX.Element {
    const navigate = useNavigate()
    const workspace = useSelector((state: AppState) => state.persist.workspace.currentWorkspace)
    const { workspaceId } = useParams()
    React.useEffect(() => {
        if (workspace && workspaceId != workspace.id) navigate(`/workspace/${workspace.id}`)
    }, [workspace])
    const { setBreadscrum } = React.useContext(BreadscrumContext)
    React.useEffect(() => {
        if (workspace)
            setBreadscrum([
                {
                    link: "/",
                    text: "Dashboard"
                },
                {
                    link: "/",
                    text: "Workspaces"
                },
                {
                    link: `/workspace/${workspace.id}`,
                    text: `${workspace.name}`
                }
            ]);
    }, [workspace]);
    return <>
        <div className="w-full flex items-center justify-between py-4">
            <WorkspaceItem
                className="[&__img]:size-12! [&__img]:rounded-md [&__p]:text-lg! [&__p]:tracking-widest [&__p]:font-bold! [&__p]:ml-2! w-1/2 hover:bg-white"
                disableDropdown />
            <Button className="bg-slate-100 hover:bg-slate-50 border border-slate-200 font-light! text-sm">Project +</Button>
        </div>

        <ProjectList />
    </>
}