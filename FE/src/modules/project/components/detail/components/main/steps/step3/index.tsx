import React from "react";
import { DropdownInfo, ProjectContext } from "@project/components/detail";
import RoleItem from "./Role/RoleItem.component";
import RoleDropContent from "./Role/RoleDropContent.component";
export default function Step3(): React.JSX.Element {
    const project = React.useContext(ProjectContext)
    return <>
        <div className="space-y-3">
            <h2 className="font-medium text-lg">Roles</h2>
            <div className="flex flex-col gap-4 justify-center text-sm h-full min-h-max py-4">
                {
                    project &&
                    project.role &&
                    project.role.map(el => (
                        <DropdownInfo
                            key={el.id}
                            itemContent={<RoleItem role={el} />}
                            dropContent={<RoleDropContent role={el} />}
                        />
                    ))
                }

            </div >
        </div>
    </>
}