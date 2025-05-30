import { Dropdown } from "@/components/Dropdown";
import Loading from "@/components/Loading.component";
import { Ellipsis, Trash } from "lucide-react";
import React from "react";
import MenuItem from "@workspace/components/MenuItem.component";
import { useDeleteWorkspaceSvc } from "@workspace/flow/workspace/workspace.service";
interface WorkspaceItemUtl {
    id: string
}
export default React.memo(function WorkspaceItemUtl({ id }: WorkspaceItemUtl): React.JSX.Element {
    return <Dropdown contentPosition="right-2! top-[100%+2px]" onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
    }} dropContent={
        <React.Suspense
            fallback={<Loading className="size-5 border-s-neutral-400 mt-4" />}>
            <ItemUtl id={id} />
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
const ItemUtl = ({ id }: WorkspaceItemUtl): React.JSX.Element => {
    const deleteMutation = useDeleteWorkspaceSvc()
    return <>
        {
            deleteMutation.isPending && <Loading className="size-5 border-s-neutral-400" />
        }
        {
            !deleteMutation.isPending && <MenuItem onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                deleteMutation.mutate(id)
            }} text="Delete Workspace" icon={<></>}>
                <Trash className="text-red-400 text-sm size-4" />
            </MenuItem>
        }

    </>
}