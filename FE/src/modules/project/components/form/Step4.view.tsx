import React from "react";
import Button from "@components/Button.component";
import { useFieldArray, useFormContext } from "react-hook-form";
import { v4 } from "uuid";
import Input from "@/components/Input.component";
import { X } from "lucide-react";
export default function Step4(): React.JSX.Element {
    const form = useFormContext()
    const { fields: roles, append, remove } = useFieldArray({
        control: form.control,
        name: "role"
    })
    return <>
        <fieldset className="space-y-2">
            <div className="flex items-center gap-2">
                <legend className="text-neutral-600">Roles</legend>
                <Button
                    className="
                    font-light! text-neutral-600
                    border border-neutral-400 
                    rounded-full! p-0! size-6
                    flex items-center justify-center"
                    type="button"
                    onClick={() => append({ name: "", id: "" })}>
                    +
                </Button>
            </div>
            {
                roles.map((_, index) => (
                    <div key={v4()}
                        className="flex items-center gap-2">

                        <Input placeholder="eg: Production"
                            fieldsetClass="w-full"
                            {...form.register(`role.${index}.name`)}
                        />

                        <Input hidden
                            {...form.register(`role.${index}.id`)}
                        />

                        {
                            roles.length > 1 &&
                            <X onClick={() => remove(index)}
                                className="text-neutral-600 font-light shrink-0 hover:text-red-500 cursor-pointer"
                            />
                        }
                    </div>
                ))
            }
        </fieldset>
    </>
}