import React from "react"
import MenuItem from "@workspace/components/MenuItem.component"
import CircleLogoWText from "@components/CircleLogoWText.component"
import Plus from "lucide-react/dist/esm/icons/plus";

import { useNavigate } from "react-router-dom"
import { useGetWorkspaceSvc } from "@workspace/flow/workspace/workspace.service"
import Loading from "@components/Loading.component"
import WorkspaceItemUtl from "./WorkspaceItemUtl.component"
import type { AppState, AppDispatch } from "@/stores"
import { useSelector, useDispatch } from "react-redux"
import { setWorkspace } from "@workspace/store"
import { v4 } from "uuid"
export default React.memo(function WorkspaceList(): React.JSX.Element {
    const navigate = useNavigate()
    const { data, isLoading } = useGetWorkspaceSvc()
    const dispatch: AppDispatch = useDispatch()
    const { currentWorkspace } = useSelector((state: AppState) => state.persist.workspace)
    return <div className="space-y-2 ">
        {
            isLoading && <Loading className="border-s-slate-300" />
        }
        {
            !isLoading && data && data.length > 0 && data.map((el) => {
                console.log(el)
                return <MenuItem key={v4()} onClick={() => dispatch(setWorkspace(el))}
                    className={`p-0! hover:bg-slate-100! ${currentWorkspace?.id == el.id && "bg-slate-100"} `}
                    icon={<CircleLogoWText text={el.name} img={el.image} className="w-full hover:bg-slate-100!" />}
                    text="" >
                    <WorkspaceItemUtl id={el.id} />
                </MenuItem>
            })
        }
        <hr className="text-slate-300" />
        <MenuItem key={v4()} onClick={() => navigate("/workspace/create")} className=" hover:bg-slate-100!" icon={<Plus className="size-5 text-slate-400" />} text="Create new" />
    </div>
})