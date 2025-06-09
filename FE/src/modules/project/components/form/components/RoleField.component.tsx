import Button from "@components/Button.component";
import Input from "@components/Input.component"
import X from "lucide-react/dist/esm/icons/x";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
export default React.memo(function RoleField(): React.JSX.Element {
    const form = useFormContext()
    const { fields: roles, append, remove } = useFieldArray({
        control: form.control,
        name: "role"
    })
    return <fieldset className="space-y-2">
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
            roles.map((el, index) => (
                <div key={el.id}
                    className="flex items-center gap-2">

                    <Input placeholder="eg: QA/PM/DEV/TechLead"
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
})