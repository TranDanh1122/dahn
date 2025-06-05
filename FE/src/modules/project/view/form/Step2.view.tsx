import Picker from "@components/Picker.component";
import React from "react";
import { useGetTechstacksSvc } from "@project/flows/techstack/techstack.service";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { z } from "zod";
import type { ProjectSchema } from "@project/models/request.schema";
import Input from "@/components/Input.component";
import { Select } from "@/components/Select";
import { type EnumSelectType, EnvironmentStatus } from "@project/const";
import Button from "@components/Button.component";
import X from "lucide-react/dist/esm/icons/x";
import { v4 } from "uuid";
export default function Step2(): React.JSX.Element {
    const form = useFormContext<z.infer<typeof ProjectSchema>>()
    const { data: techstacks, isLoading, isError } = useGetTechstacksSvc()
    const { fields: environments, append, remove } = useFieldArray({
        control: form.control,
        name: "environment"
    })
    const handleApdItem = () => append({ name: "", demoUrl: "", status: "active" })
    const handleDelItem = (id: number) => remove(id)
    return <div className="space-y-4" >
        <Picker
            dataSet={(isLoading || isError) ? [] : techstacks || []}
            data={form.getValues("techstack")?.split(",") ?? []}
            onItemClick={(val) => form.setValue("techstack", val)}
        />
        <fieldset className="space-y-2">
            <div className="flex items-center gap-2">
                <legend className="text-neutral-600">Environments</legend>
                <Button
                    className="
                    font-light! text-neutral-600
                    border border-neutral-400 
                    rounded-full! 
                    p-0! size-6
                    flex items-center justify-center"
                    type="button"
                    onClick={handleApdItem}>
                    +
                </Button>
            </div>
            {
                environments.map((_, index) => (
                    <div
                        key={v4()}
                        className="flex items-center gap-2">
                        <Input
                            fieldsetClass="w-1/3 shrink-0"
                            placeholder="eg: Production"
                            {...form.register(`environment.${index}.name`)}
                        />
                        <Input
                            fieldsetClass="w-1/2"
                            placeholder="eg: https://path-to-production.com"
                            {...form.register(`environment.${index}.demoUrl`)}
                        />
                        <Select<EnumSelectType[number]>
                            id="environment" hasIcon
                            className="
                                flex-grow-0
                                border border-neutral-300 hover:border-fuchsia-300 
                                rounded-lg w-1/6 min-w-1/6 max-w-1/6"
                            changeValue="value"
                            valueKey="value"
                            textKey="text"
                            dataSets={EnvironmentStatus}
                            defaultValue={EnvironmentStatus[0]}
                            onChange={(e) => form.setValue(`environment.${index}.status`, String(e))}
                        />
                        {
                            environments.length > 1 &&
                            <X
                                className="text-neutral-600 font-light"
                                onClick={() => handleDelItem(index)}
                            />
                        }
                    </div>
                ))
            }
        </fieldset>

    </div>
}