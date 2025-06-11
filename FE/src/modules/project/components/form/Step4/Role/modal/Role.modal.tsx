
import React from "react";
import Input from "@/components/Input.component";
import type { ModalProps } from "@components/ArrayForm";
import RadioGroup, { type ItemData } from "@components/RadioGroup";
import PermissionItem from "./PermissionItem.component";
import { z } from "zod";
import { roleSchema } from "@project/models/request.schema";
const roleDataSets: ItemData[] = [
    { value: "admin", text: "Admin" },
    { value: "read", text: "Read" },
    { value: "write", text: "Write" },
];
export default function Role({ modalForm }: ModalProps<z.infer<typeof roleSchema>>): React.JSX.Element {

    if (!modalForm) return <></>

    return (
        <>
            <Input
                label="Role name"
                labelClass="font-light!"
                placeholder="eg: QA/PM/DEV/TechLead"
                fieldsetClass="w-full"
                {...modalForm.register(`name`)}
                error={modalForm.formState.errors.name?.message}
            />

            <Input hidden
                {...modalForm.register(`id`)}
            />
            <RadioGroup
                itemEl={<PermissionItem />}
                dataSets={roleDataSets}
                label="Project"
                name="project"
                value={modalForm.watch("project")}
                onChange={(value) => modalForm.setValue("project", value)} />
            <RadioGroup
                itemEl={<PermissionItem />}
                dataSets={roleDataSets}
                label="Milestone"
                name="milestone"
                value={modalForm.watch("milestone")}
                onChange={(value) => modalForm.setValue("milestone", value)} />
            <RadioGroup
                itemEl={<PermissionItem />}
                dataSets={roleDataSets}
                label="Folder"
                name="folder"
                value={modalForm.watch("folder")}
                onChange={(value) => modalForm.setValue("folder", value)} />
            <small className="text-sm text-neutral-400 italic">*You can custom role for each user/assets when add user to project</small>

        </>
    )
}