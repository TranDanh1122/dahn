import type { ProjectSchema } from "@project/models/request.schema";
import { useGetTechstacksSvc } from "@project/flows/techstack/techstack.service";
import { useFormContext, useFieldArray } from "react-hook-form";
import { z } from "zod"
/**
 * A simple hook, handle add/delete environments and fetch techstacks data
 * @returns techstacks : data of techstack list fetch from API
 * @returns isLoading : loading state of this API
 * @returns isError : error state of this API
 * @returns environmemnt : field list of useFieldArray
 * @returns handleApdItem : append item action
 * @returns handleDelItem(id/index : number) : remove item action 
 * @returns form : form in current context
 */
export const useStep2Hook = () => {
    const form = useFormContext<z.infer<typeof ProjectSchema>>()
    const { data: techstacks, isLoading, isError } = useGetTechstacksSvc()
    const { fields: environments, append, remove } = useFieldArray({
        control: form.control,
        name: "environment"
    })
    const handleApdItem = () => append({ name: "", demoUrl: "", status: "active" })
    const handleDelItem = (id: number) => remove(id)
    return {
        techstacks,
        isLoading,
        isError,
        environments,
        handleApdItem,
        handleDelItem,
        form
    }
}