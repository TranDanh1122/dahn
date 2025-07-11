import Button from "@/components/Button.component";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteProjectMutation } from "@project/flows/project/project.service";
import Loading from "@components/Loading.component";
import { useSelector } from "react-redux";
import type { AppState } from "@/stores";
import LoadingComponent from "@components/Loading.component";
export default React.memo(function HRightContent(): React.JSX.Element {
    const { projectId } = useParams();
    const deleteMutation = useDeleteProjectMutation()
    const navigate = useNavigate()
    const loading = useSelector((state: AppState) => state.project.loading)
    const error = useSelector((state: AppState) => state.project.error)


    const handleDelete = React.useCallback(() => {
        if (projectId)
            deleteMutation.mutate(projectId, {
                onSuccess: (data) => {
                    navigate(`/workspace/${data.workspaceID}`)
                }
            })
    }, [projectId])

    if (!projectId) return <></>
    return (
        <div className="flex items-center gap-2">
            {
                loading && <>
                    <LoadingComponent className="border-s-slate-400 size-4" />
                    <p className="text-slate-400 text-sm">Loading</p>
                </>
            }
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
        </div>

    )
})