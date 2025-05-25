import React from "react"
import MenuItem from "@workspace/components/MenuItem.component"
import CircleLogoWText from "@/components/CircleLogoWText.component"
import { Plus, Check } from "lucide-react"
import { useNavigate } from "react-router-dom"
export default React.memo(function WorkspaceList(): React.JSX.Element {
    const navigate = useNavigate()
    return <div className="space-y-2 ">
        <MenuItem className="p-0! hover:bg-blue-100!" icon={<CircleLogoWText text="Company 1" img="" className="w-full hover:bg-blue-100! " />} text="" >
            <Check className="size-5 text-neutral-500 mr-2" />
        </MenuItem>
        <hr className="text-neutral-300" />
        <MenuItem action={() => navigate("/create-workspace")} className=" hover:bg-blue-100!" icon={<Plus class="size-5 text-neutral-400" />} text="Create new" />
    </div>
})