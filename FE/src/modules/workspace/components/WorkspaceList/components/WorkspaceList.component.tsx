import React from "react"
import MenuItem from "@workspace/components/MenuItem.component"
import CircleLogoWText from "@/components/CircleLogoWText.component"
import { Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useGetWorkspaceSvc } from "@workspace/flow/workspace/workspace.service"
import Loading from "@/components/Loading.component"
import WorkspaceItemUtl from "./WorkspaceItemUtl.component"
export default React.memo(function WorkspaceList(): React.JSX.Element {
    const navigate = useNavigate()
    const { data, isLoading } = useGetWorkspaceSvc()
    return <div className="space-y-2 ">
        {
            isLoading && <Loading className="border-s-neutral-300" />
        }
        {
            !isLoading && data && data.length > 0 && data.map((el) => {
                return <MenuItem onClick={() => alert(2)}
                    className="p-0! hover:bg-neutral-100!"
                    icon={<CircleLogoWText text={el.name} img={el.image} className="w-full hover:bg-neutral-100!" />}
                    text="" >
                    <WorkspaceItemUtl id={el.id} />
                </MenuItem>
            })
        }
        <hr className="text-neutral-300" />
        <MenuItem onClick={() => navigate("/workspace/create")} className=" hover:bg-neutral-100!" icon={<Plus className="size-5 text-neutral-400" />} text="Create new" />
    </div>
})