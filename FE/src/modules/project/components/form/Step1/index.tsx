import React from "react";
import Input from "@components/Input.component";
import TextArea from "@components/TextArea.component";
import { Select } from "@components/Select";
import { useFormContext } from "react-hook-form";
import type { ProjectData } from "@project/models";

import { TypeDataSet, type EnumSelectType } from "@project/const"
export default function Step1(): React.JSX.Element {
    const form = useFormContext<ProjectData>()
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
            <label htmlFor="type" className="font-light text-slate-600 cursor-pointer ">Project type</label>
            <Select<EnumSelectType[number]>
                id="type"
                className="border border-slate-300 
                hover:border-blue-300 rounded-lg"
                changeValue="value"
                valueKey="value"
                textKey="text"
                onChange={(e) => form.setValue("type", String(e))}
                defaultValue={TypeDataSet[0]}
                dataSets={TypeDataSet}
            />
            {form.formState.errors.type &&
                <p
                    className="
                    text-red-600 
                    text-sm 
                    font-semibold 
                    w-full 
                    text-left"
                    aria-label={form.formState.errors.type.message}
                    aria-live="assertive">
                    {form.formState.errors.type.message}
                </p>
            }

        </fieldset>
        <Input label="Client"
            placeholder="eg: My soul!"
            labelClass=" font-light!"
            error={form.formState.errors.client?.message}
            {...form.register("client")}
        />

    </div>
}