import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import Input from "@/components/Input.component"
import Button from "@/components/Button.component"
export default React.memo(function Step2(): React.JSX.Element {
    const form = useFormContext()
    const { fields: members, append } = useFieldArray({
        control: form.control,
        name: "members"
    })
    return <div className="space-y-4">
        <h1 className="text-neutral-600 text-2xl font-light text-center">Add member</h1>
        {
            members.map((field, index) => {
                return <div key={field.id} className="flex items-center gap-2">
                    <Input {...form.register(`members.${index}.email`)} fieldsetClass="w-2/3" label="Email" />
                    <Input {...form.register(`members.${index}.avg_salary`)} fieldsetClass="w-1/3" label="Avg. Rate ($/h)" />
                </div>
            })
        }
        <Button className="text-neutral-600 border-neutral-400 border!" onClick={() => append({ email: "", avg_salary: "" })} type="button"> Add more member </Button>
        <p className="italic text-xs underline text-blue-500 ">Skip for now</p>
    </div>
})