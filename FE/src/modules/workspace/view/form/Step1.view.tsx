import React from 'react'
import Input from "@/components/Input.component"
import TextArea from "@/components/TextArea.component"
import ImageUpload from "@/components/ImageUpload.component"
import { useFormContext } from 'react-hook-form'

export default React.memo(function Step1(): React.JSX.Element {
    const form = useFormContext()
    return <div className="space-y-4">
        <h1 className="text-neutral-600 text-2xl font-light text-center">Create Workspace</h1>
        <div>
            <Input label="Workspace Name" className="text-sm"
                placeholder="eg: Dream team 1"
                labelClass="text-sm font-light!"
                {...form.register("name")} />
            <small className="pl-2">Workspace, mean that you company/team or something you want</small>
        </div>

        <TextArea {...form.register("description")}
            label="Description" labelClass="text-sm font-light!"
            placeholder="eg: This is my start up"
            className="text-sm"
        />
        <ImageUpload id="workspace_img" label="Workspace Logo" {...form.register("thumbnail")} />
    </div>

})