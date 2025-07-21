
import React from "react";
import Input from "@/components/Input.component";
import RadioGroup from "@components/RadioGroup";
import PermissionItem from "./PermissionItem.component";
import { z } from "zod";
import { roleSchema } from "@project/models/request.schema";
import { RoleDataSets } from "@project/const";
import { v4 } from "uuid";
import { useFormContext } from "react-hook-form";

export default function Role(): React.JSX.Element {

    const modalForm = useFormContext<z.infer<typeof roleSchema>>()

    React.useEffect(() => {
        if (!modalForm) return
        if (!modalForm.watch("id")) modalForm.reset({ "id": v4() })
    }, [modalForm?.watch("id")])

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
            <Input hidden   {...modalForm.register(`id`)} />
            <RadioGroup
                itemEl={<PermissionItem />}
                dataSets={RoleDataSets}
                label="Project"
                name="project"
                value={modalForm.watch("project")}
                onChange={(value) => modalForm.setValue("project", value)} />
            <RadioGroup
                itemEl={<PermissionItem />}
                dataSets={RoleDataSets}
                label="Milestone"
                name="milestone"
                value={modalForm.watch("milestone")}
                onChange={(value) => modalForm.setValue("milestone", value)} />
            <RadioGroup
                itemEl={<PermissionItem />}
                dataSets={RoleDataSets}
                label="Folder"
                name="folder"
                value={modalForm.watch("folder")}
                onChange={(value) => modalForm.setValue("folder", value)} />
            <small className="text-sm text-slate-400 italic">*You can custom role for each user/assets when add user to project</small>

        </>
    )
}