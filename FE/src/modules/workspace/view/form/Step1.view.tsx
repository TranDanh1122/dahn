import React from 'react'
import Input from "@components/Input.component"
import TextArea from "@components/TextArea.component"
import { ImageUpload } from "@components/ImageUpload"
import { useFormContext } from 'react-hook-form'
import type { WorkspaceFormData } from '@workspace/models/request.schema'
export default React.memo(function Step1(): React.JSX.Element {
    const form = useFormContext<WorkspaceFormData>()
    return <div className="space-y-4">
        <div>
            <Input label="Workspace Name"
                placeholder="eg: Dream team 1"
                labelClass=" font-light!"
                error={form.formState.errors.name?.message}
                {...form.register("name")}

            />
            <small className="pl-2">Workspace, mean that you company/team or something you want</small>
        </div>

        <TextArea
            {...form.register("description")}
            label="Description" labelClass="font-light!"
            placeholder="eg: This is my start up"
            error={form.formState.errors.description?.message}
            rows={3}
        />
        <ImageUpload
            hasDelete
            deleteAction={() => form.setValue("thumbnail", "")}
            reactValue={form.watch("thumbnail")}
            id="workspace_img"
            label="Workspace Logo"
            {...form.register("thumbnail")}
            labelClass="font-light!" />
    </div>

})