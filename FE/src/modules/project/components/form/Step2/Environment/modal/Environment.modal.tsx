import React from "react";
import Input from "@components/Input.component";
import type { z } from "zod";
import type { envSchema } from "@project/models/request.schema";
import { Select } from "@components/Select";
import { EnvironmentStatus, type EnumSelectType } from "@project/const";
import TextArea from "@components/TextArea.component";
import { useFormContext } from "react-hook-form";
export default function Environment(): React.JSX.Element {
    const modalForm = useFormContext<z.infer<typeof envSchema>>()

    React.useEffect(() => {
        if (modalForm && !modalForm.getValues("status")) modalForm.setValue(`status`, "active")
    }, [modalForm?.watch("status")])
    const defaultValue = React.useMemo(() => {
        if (!modalForm || !modalForm.getValues("status")) return EnvironmentStatus[0]
        return EnvironmentStatus.find(el => el.value == modalForm?.getValues("status")) || EnvironmentStatus[0]
    }, [])
    if (!modalForm) return <></>
    return <>
        <div className="flex items-center gap-3 space-y-2">
            <Input
                label="Environment Name"
                labelClass="font-light!"
                fieldsetClass="w-1/2 shrink-0"
                placeholder="eg: Production"
                {...modalForm.register(`name`)}
                error={modalForm.formState.errors.name?.message}
            />
            <Input
                label="Demo URL"
                labelClass="font-light!"
                fieldsetClass="w-1/2"
                placeholder="eg: https://path-to-demo.com"
                {...modalForm.register(`demoUrl`)}
                error={modalForm.formState.errors.demoUrl?.message}
            />
        </div>
        <div className="flex items-center gap-3">
            <fieldset className="flex w-1/2 flex-col gap-2">
                <label htmlFor="environment" className="text-slate-600 text-sm font-light">Status</label>
                <Select<EnumSelectType[number]>
                    id="environment" hasIcon
                    className="flex-grow-0 border border-slate-300 hover:border-blue-300 rounded-lg "
                    changeValue="value"
                    valueKey="value"
                    textKey="text"
                    dataSets={EnvironmentStatus}
                    defaultValue={defaultValue}
                    onChange={(e) => modalForm.setValue(`status`, String(e))}
                />
            </fieldset>

            <Input
                label="Readme URL"
                labelClass="font-light!"
                fieldsetClass="w-1/2"
                placeholder="eg: https://path-to-readme.com"
                {...modalForm.register(`readme`)}
                error={modalForm.formState.errors.readme?.message}
            />
        </div>
        <TextArea
            label="Quick note"
            labelClass="font-light! mt-2"
            rows={4}
            placeholder="eg: This server is heading branch:project/final_demo - commit: #3121a1"
            {...modalForm.register(`note`)}
            error={modalForm.formState.errors.note?.message}
        />
    </>
}