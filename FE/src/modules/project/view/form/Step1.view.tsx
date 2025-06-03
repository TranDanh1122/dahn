import React from "react";
import Input from "@components/Input.component";
import TextArea from "@components/TextArea.component";
import { Select } from "@components/Select";
import { useFormContext } from "react-hook-form";
import { ProjectSchema } from "@project/models/request.schema";
import { z } from "zod"
export default function Step1(): React.JSX.Element {
    const form = useFormContext<z.infer<typeof ProjectSchema>>()
    return <div className="space-y-4">
        <Input label="Project Name (*)"
            placeholder="eg: Fookbace App"
            labelClass=" font-light!"
            error={form.formState.errors.name?.message}
            {...form.register("name")}

        />
        <TextArea
            {...form.register("overview")}
            label="Overview (*)"
            labelClass="font-light!"
            placeholder="eg: A simple social webapp"
            error={form.formState.errors.overview?.message}
            rows={3}
        />
        <TextArea
            {...form.register("description")}
            label="Description"
            labelClass="font-light!"
            placeholder="eg: This app will help me connect with my mother easier"
            error={form.formState.errors.description?.message}
            rows={5}
        />
        <fieldset className="flex flex-col gap-2">
            <label htmlFor="type" className="font-light text-neutral-600 cursor-pointer ">Project type</label>
            <Select<{ value: string, text: string }>
                id="type"
                className="border border-neutral-300 hover:border-fuchsia-300  rounded-lg"
                changeValue="value"
                valueKey="value"
                textKey="text"

                defaultValue={{ value: "web", text: "Website (focus UI and SEO)" }}
                dataSets={[
                    { value: "web", text: "Website (focus UI and SEO)" },
                    { value: "web_app", text: "Webapp (focus feature and functionally)" },
                    { value: "mobile_app", text: "Mobile app" },
                    { value: "api", text: "API Client" },
                    { value: "other", text: "Other" }
                ]} />
        </fieldset>
        <Input label="Client"
            placeholder="eg: My soul!"
            labelClass=" font-light!"
            error={form.formState.errors.name?.message}
            {...form.register("client")}

        />
    </div>
}