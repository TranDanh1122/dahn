import Button from "@/components/Button.component";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteProjectMutation } from "@project/flows/project/project.service";
import Loading from "@components/Loading.component";
import { useSelector } from "react-redux";
import type { AppState } from "@/stores";
import LoadingComponent from "@components/Loading.component";
import RefreshCw from "lucide-react/dist/esm/icons/refresh-cw";
import coreOptimicQueue from "@/common/ults/OptimicQueue";

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
    const retry = React.useCallback(() => {
        coreOptimicQueue.retry()
    }, [])
    if (!projectId) return <></>
    return (
        <div className="flex items-center gap-2 text-xs ">
            {
                loading && <>
                    <LoadingComponent className="border-s-slate-400 size-4" />
                    <p className="text-slate-400">Loading</p>
                </>
            }
            {
                error && <div onClick={retry} className="flex items-center gap-2 cursor-pointer">
                    <RefreshCw className="size-3 text-red-400 " />
                    <p className="text-red-400">Error...Pls retry</p>
                </div>
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