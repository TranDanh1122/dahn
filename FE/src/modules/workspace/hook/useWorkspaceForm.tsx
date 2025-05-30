import { useForm } from "react-hook-form"
import { WorkspaceFormSchema, type WorkspaceFormData } from "@workspace/models/request.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useCreateWorkspaceSvc } from "@workspace/flow/workspace/workspace.service";
import { useNavigate } from "react-router-dom";
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
    const navigate = useNavigate()
    const createWorkspace = useCreateWorkspaceSvc()
    const onSubmit = (values: WorkspaceFormData) => {
        createWorkspace.mutate(values, {
            onSuccess: () => navigate("/")
        })
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