import { RoleDataSets } from "@/modules/project/const";
import { Infor } from "@project/components/detail";
import type { RoleData } from "@project/models";
import React from "react";
export default function RoleItem({ role }: { role: RoleData }): React.JSX.Element {
    const [project, milestone, folder] = React.useMemo(() => {
        let project, milestone, folder
        RoleDataSets.forEach(el => {
            if (el.value == role.project) project = el.text
            if (el.value == role.milestone) milestone = el.text
            if (el.value == role.folder) folder = el.text
        })
        return [project, milestone, folder]
    }, [role])

    return <>
        <div className="grid grid-cols-4 group ">
            <Infor>{role.name}</Infor>
            <Infor label="Project: " className="[&__h2]:w-max">{project}</Infor>
            <Infor label="Milestone:" className="[&__h2]:w-max">{milestone}</Infor>
            <Infor label="Folder:" className="[&__h2]:w-max">{folder}</Infor>
        </div>
    </>
}