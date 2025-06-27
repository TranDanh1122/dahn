import Button from "@/components/Button.component";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteProjectMutation } from "@project/flows/project/project.service";
import Loading from "@components/Loading.component";
export default React.memo(function HRightContent(): React.JSX.Element {
    const { projectId } = useParams();
    const deleteMutation = useDeleteProjectMutation()
    const navigate = useNavigate()
    if (!projectId) return <></>
    const handleDelete = () => {
        deleteMutation.mutate(projectId, {
            onSuccess: (data) => {
                navigate(`/workspace/${data.workspaceID}`)
            }
        })
    }
    return (
        <Button
            onClick={handleDelete}
            title="Delete Project"
            className={`text-white text-sm rounded-full
                        flex items-center gap-1
                        bg-red-400 hover:bg-red-200
                    `}>

            {
                deleteMutation.isPending
                    ? <Loading className="" />
                    : "Delete"
            }

        </Button>
    )
})