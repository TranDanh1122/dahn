import { RoleDataSets } from "@/modules/project/const";
import { Infor } from "@project/components/detail";
import type { RoleData } from "@project/models";
import React from "react";
export default function RoleItem({ role }: { role: RoleData }): React.JSX.Element {
    const [project, milestone, folder] = React.useMemo(() => {
        let project, milestone, folder
        RoleDataSets.forEach(el => {
            switch (el.value) {
                case role.project: {
                    project = el.text
                    break
                }
                case role.milestone: {
                    milestone = el.text
                    break
                }
                case role.folder: {
                    folder = el.text
                    break
                }
            }
        })
        return [project, milestone, folder]
    }, [role])

    return <>
        <div className="grid grid-cols-4 group ">
            <Infor>{role.name}</Infor>
            <Infor label="Project: " className="[&__h2]:w-max">{project} admin</Infor>
            <Infor label="Milestone:" className="[&__h2]:w-max">{milestone} admin</Infor>
            <Infor label="Folder:" className="[&__h2]:w-max">{folder} admin</Infor>
        </div>
    </>
}