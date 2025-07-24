import { RoleDataSets } from "@/modules/project/const";
import { Infor } from "@project/components/detail";
import type { RoleData } from "@project/models";
import React from "react";
import SquarePen from "lucide-react/dist/esm/icons/square-pen";
import X from "lucide-react/dist/esm/icons/x"
export default function RoleItem({ role, openModal }: { role: RoleData, openModal?: (e: React.MouseEvent) => void }): React.JSX.Element {
    const [project, milestone, folder] = React.useMemo(() => {
        let project, milestone, folder
        RoleDataSets.forEach(el => {
            if (el.value == role.project) project = el.text
            if (el.value == role.milestone) milestone = el.text
            if (el.value == role.folder) folder = el.text
        })
        return [project, milestone, folder]
    }, [role])
    const deleteRole = React.useCallback((e: React.MouseEvent) => {
        e.stopPropagation()
    }, [])
    return <>
        <div className="grid grid-cols-5 group p-2">
            <Infor>{role.name}</Infor>
            <Infor label="Project: " className="[&__h2]:w-max">{project}</Infor>
            <Infor label="Milestone:" className="[&__h2]:w-max">{milestone}</Infor>
            <Infor label="Folder:" className="[&__h2]:w-max">{folder}</Infor>
            <div className="flex items-center justify-start gap-3">
                <SquarePen onClick={(e) => openModal?.(e)} className="size-5 text-slate-500 cursor-pointer items-center hover-show" />
                <X onClick={(e) => deleteRole(e)} className="size-5 text-slate-700 hover-show cursor-pointer" />
            </div>
        </div>
    </>
}