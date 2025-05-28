import { useForm } from "react-hook-form"
import { WorkspaceFormSchema, type WorkspaceFormData } from "@workspace/models/request.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useCreateWorkspaceSvc } from "@workspace/flow/workspace/workspace.service";
const stepFields: Record<number, (keyof WorkspaceFormData)[]> = {
    1: ["name", "description", "thumbnail"],
    2: ["members"],
};
export default function useWorkspaceForm() {
    const form = useForm<WorkspaceFormData>({
        defaultValues: {
            name: "", thumbnail: "", description: "", members: [
                {
                    email: "", avg_salary: ""
                }
            ]
        },
        resolver: zodResolver(WorkspaceFormSchema),
        mode: "all"
    })
    const createWorkspace = useCreateWorkspaceSvc()
    const onSubmit = (values: WorkspaceFormData) => {
        createWorkspace.mutate(values)
    }
    const [step, changeStep] = React.useState<number>(1)
    const handleBack = () => {
        changeStep(prev => prev - 1)
    }
    const handleNext = () => {
        form.trigger(stepFields[step]).then((isValid) => {
            if (!isValid) return
            changeStep(prev => prev + 1)
        })
    }
    return { handleNext, handleBack, onSubmit, step, form, isLoading: createWorkspace.isPending }
}