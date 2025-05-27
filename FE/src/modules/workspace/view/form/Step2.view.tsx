import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import Input from "@/components/Input.component"
import Button from "@/components/Button.component"
import { Trash } from "lucide-react"
import InputSearch from "@/components/InputSearch.component"
import { useSearchUserSvc, type User, type SearchUserParams } from "@user/index"
export default React.memo(function Step2(): React.JSX.Element {
    const form = useFormContext()
    const { fields: members, append, remove } = useFieldArray({
        control: form.control,
        name: "members"
    })

    const userSearchService = useSearchUserSvc()
    return <div className="space-y-4">
        {
            members.map((field, index) => {
                return <div key={field.id} className="flex items-center gap-2 relative">
                    <InputSearch<User, SearchUserParams> searchService={userSearchService} childrenFn={
                        (data: User) => <>{data.email}</>
                    } />
                    <Input {...form.register(`members.${index}.avg_salary`)} fieldsetClass="w-1/3" label="" placeholder="Avg. Rate ($/h)" className="placeholder:font-light!" />
                    {members.length > 1 && <Trash onClick={() => remove(index)} className="font-light! size-5 text-red-400 cursor-pointer" />}
                </div>
            })
        }
        <Button className="text-neutral-600 border-neutral-400 border! text-sm font-light!" onClick={() => append({ email: "", avg_salary: "" })} type="button"> Add more member </Button>
        {/* <p className="italic text-xs underline text-blue-500 ">Skip for now</p> */}
    </div>
})