import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import Input from "@/components/Input.component"
import Button from "@/components/Button.component"
import { Trash } from "lucide-react"
import useDebounce from "@/common/hooks/useDebounce";
import { useSearchUserSvc } from "@/modules/user";
export default React.memo(function Step2(): React.JSX.Element {
    const form = useFormContext()
    const { fields: members, append, remove } = useFieldArray({
        control: form.control,
        name: "members"
    })
    const { debouce } = useDebounce()
    const searchService = useSearchUserSvc()
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (value.length < 3) return;
        debouce(() => {
            searchService.mutate({ search: value })
        }, 500)
    }
    return <div className="space-y-4">
        {
            members.map((field, index) => {
                return <div key={field.id} className="flex items-center gap-2 relative">
                    <Input {...form.register(`members.${index}.email`)} disabled={true} fieldsetClass="w-2/3" label="" placeholder="Email" className="placeholder:font-light!" />
                    <div className="absolute top-[calc(100%+8px)] right-0 w-full p-2 z-10 bg-white border border-neutral-300 rounded-md shadow-lg">
                        <Input label="" className="text-sm placeholder:font-light!" placeholder="Search user by email" onChange={handleSearch}></Input>
                        {searchService.isPending && <span className="ml-2 text-xs text-blue-500">Searching...</span>}
                        {
                            searchService.data && searchService.data.users.length > 0 && (
                                <ul className="absolute top-full left-0 w-full bg-white border border-neutral-300 rounded-md shadow-lg z-10">
                                    {searchService.data.user.map((user: any) => (
                                        <li
                                            key={user.id}
                                            className="px-4 py-2 hover:bg-neutral-100 cursor-pointer"
                                            onClick={() => form.setValue(`members.${index}.email`, user.email)}
                                        >
                                            {user.email}
                                        </li>
                                    ))}
                                </ul>
                            )
                        }
                    </div>
                    <Input {...form.register(`members.${index}.avg_salary`)} fieldsetClass="w-1/3" label="" placeholder="Avg. Rate ($/h)" className="placeholder:font-light!" />
                    {members.length > 1 && <Trash onClick={() => remove(index)} className="font-light! size-5 text-red-400 cursor-pointer" />}
                </div>
            })
        }
        <Button className="text-neutral-600 border-neutral-400 border! text-sm font-light!" onClick={() => append({ email: "", avg_salary: "" })} type="button"> Add more member </Button>
        {/* <p className="italic text-xs underline text-blue-500 ">Skip for now</p> */}
    </div>
})