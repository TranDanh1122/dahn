import AddNewBtn from "@components/ListItemButton.component"
import React from "react"
import { useParams, Navigate } from "react-router-dom"
interface ProjectListProps {
    workspace?: string
}
export default function ProjectList({ workspace }: ProjectListProps): React.JSX.Element {
    const { workspaceId } = useParams()
    if (workspaceId && workspace) return <Navigate to="404.html" />
    return <div className="grid grid-cols-5 gap-x-12 gap-y-8">
        <AddNewBtn/>
    </div>
}