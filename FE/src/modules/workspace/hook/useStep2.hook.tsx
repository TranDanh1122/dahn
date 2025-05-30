import { useFieldArray, useFormContext } from "react-hook-form"
import type { WorkspaceFormData } from "@workspace/models/request.schema"
import type { User } from "@/modules/user"
import React from "react"
export default function useStep2() {
    const form = useFormContext<WorkspaceFormData>()
    const { fields: members, append, remove } = useFieldArray({
        control: form.control,
        name: "members"
    })
    const handleResultItemClick = React.useCallback((data: User, index: number) => {
        form.setValue(`members.${index}.id`, String(data.id))
        form.setValue(`members.${index}.email`, data.email)
    }, [form.watch("members")])
    const filter = React.useCallback((data: User) => {
        return !form.getValues("members")?.some((item) => item.email === data.email)
    }, [form.watch("members")])
    const childrenFn = React.useCallback((data: User) => <>{data.email} </>, [])
    return { childrenFn, handleResultItemClick, members, append, remove , filter, form}
}