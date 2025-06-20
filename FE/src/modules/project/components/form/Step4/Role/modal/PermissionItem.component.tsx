import type { ItemData } from "@components/RadioGroup";
import React from "react";
import UserCog from "lucide-react/dist/esm/icons/user-cog"
import SquarePen from "lucide-react/dist/esm/icons/square-pen"
import PencilOff from "lucide-react/dist/esm/icons/pencil-off"

interface PermissionItemProps {
    data?: ItemData
}
export default function PermissionItem({ data }: PermissionItemProps): React.JSX.Element {
    return <>
        <div className="space-y-1">
            {data?.value == "admin" && <UserCog className="size-4 text-slate-500 " />}
            {data?.value == "write" && <SquarePen className="size-4 text-slate-500 " />}
            {data?.value == "read" && <PencilOff className="size-4 text-slate-500 " />}
            <h2 className="text-slate-600 text-sm font-medium">{data?.text}</h2>

            <span className="text-slate-400 text-sm font-medium">
                {data?.value == "admin" && "(All permission)"}
                {data?.value == "write" && "(Can edit assets)"}
                {data?.value == "read" && "(Can view assets)"}
            </span>
        </div>

    </>
}