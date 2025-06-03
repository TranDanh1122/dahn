import ListItemButton from "@components/ListItemButton.component"
import React from "react"
import { useParams, Navigate, useNavigate } from "react-router-dom"
interface ProjectListProps {
    workspace?: string
}
export default function ProjectList({ workspace }: ProjectListProps): React.JSX.Element {
    const { workspaceId } = useParams()
    const navigate = useNavigate()
    if (workspaceId && workspace) return <Navigate to="404.html" />
    return <div className="grid grid-cols-5 gap-x-12 gap-y-8 auto-rows-[230px] mt-8">
        <ListItemButton
            onClick={() => navigate("/project/create")}
            title="Add new workspace">
            <p className="font-black text-8xl text-neutral-400">+</p>
        </ListItemButton>
    </div>
}