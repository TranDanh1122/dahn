import React from "react";
import { ArrayForm } from "@components/ArrayForm";
import { RoleTableItem, RoleTableHeader, RoleModal } from "./Role";
import { memberSchema, roleSchema } from "@project/models/request.schema";
import { MemberHeaderItem, MemberModal, MemberTableItem } from "./Member";
export default function Step4(): React.JSX.Element {

    return <>
        <ArrayForm
            type="table"
            name="role"
            label="Roles"
            headerEl={<RoleTableHeader />}
            itemEl={<RoleTableItem />}
            modalFormContent={<RoleModal />}
            modalFormSchema={roleSchema}
        />
        <ArrayForm
            type="table"
            name="members"
            label="Members"
            headerEl={<MemberHeaderItem />}
            itemEl={<MemberTableItem />}
            modalFormSchema={memberSchema}
            modalFormContent={<MemberModal />}
        />
    </>
}