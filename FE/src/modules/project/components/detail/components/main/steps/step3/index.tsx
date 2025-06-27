import React from "react";
import { DropdownInfo, ProjectContext } from "@project/components/detail";
import RoleItem from "./Role/RoleItem.component";
import RoleDropContent from "./Role/RoleDropContent.component";
import MemberItem from "./Member/MemberItem.component";
export default function Step3(): React.JSX.Element {
    const project = React.useContext(ProjectContext)
    const roleList = React.useMemo(() =>
        project?.role?.map(el =>
            <DropdownInfo
                key={el.id}
                itemContent={<RoleItem role={el} />}
                dropContent={
                    <RoleDropContent role={el} />
                }
            />) || "",
        [project?.role])
    const memberList = React.useMemo(() =>
        project?.members.map(el =>
            <MemberItem
                key={el.id}
                member={el}
            />) || "",
        [project?.members])
    return <>
        <div className="space-y-3">
            <h2 className="font-medium text-lg">Roles</h2>
            <div className="flex flex-col gap-4 justify-center text-sm h-full min-h-max py-4">
                {roleList}
            </div >
        </div>
        <div className="space-y-3">
            <h2 className="font-medium text-lg">Users</h2>
            <div className="grid grid-cols-4 gap-3 text-sm min-h-max py-4">
                {memberList}
            </div>
        </div>
    </>
}