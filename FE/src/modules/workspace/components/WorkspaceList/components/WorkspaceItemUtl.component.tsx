import { Dropdown } from "@components/Dropdown";
import Loading from "@components/Loading.component";
import Ellipsis from "lucide-react/dist/esm/icons/ellipsis";
import Trash from "lucide-react/dist/esm/icons/trash";
import SquarePen from "lucide-react/dist/esm/icons/square-pen";
import React from "react";
import MenuItem from "@workspace/components/MenuItem.component";
import { useDeleteWorkspaceSvc } from "@workspace/flow/workspace/workspace.service";
import { useNavigate } from "react-router-dom";
interface WorkspaceItemUtl {
    id: string
}
export default React.memo(function WorkspaceItemUtl({ id }: WorkspaceItemUtl): React.JSX.Element {
    return <Dropdown role="dropdown" contentPosition="right-2! top-[100%+2px]" onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
    }} dropContent={
        <React.Suspense
            fallback={<Loading className="size-5 border-s-neutral-400 mt-4" />}>
            <ItemUtl id={id} action={() => {
                document.body.click()
            }} />
        </React.Suspense>
    }>
        <Ellipsis className="size-5 text-neutral-500 mr-2 -z-10" />
    </Dropdown>
})
/**
 * 
 * why split here?
 * Imagine if mutation status change, and the whole list of item re-render.....
 */
const ItemUtl = ({ id, action }: WorkspaceItemUtl & { action?: () => void }): React.JSX.Element => {
    const deleteMutation = useDeleteWorkspaceSvc()
    const navigate = useNavigate()
    return <>

        {
            <MenuItem text={"Edit Workspace"} icon={<></>} onClick={
                (e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    navigate(`/workspace/${id}/edit`)
                }
            }>
                <SquarePen className="text-neutral-400 size-4 ml-auto" />
            </MenuItem>
        }
        {
            deleteMutation.isPending && <Loading className="size-5 border-s-neutral-400" />
        }
        {
            !deleteMutation.isPending && <MenuItem onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                deleteMutation.mutate(id, {
                    onSuccess: () => action?.()
                })
            }} text="Delete Workspace" icon={<></>}>
                <Trash className="text-red-400 text-sm size-4 ml-auto" />
            </MenuItem>
        }


    </>
}