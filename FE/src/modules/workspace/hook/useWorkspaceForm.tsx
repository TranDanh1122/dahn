import { useForm } from "react-hook-form"
import { WorkspaceFormSchema, type WorkspaceFormData } from "@workspace/models/request.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import {
    useCreateWorkspaceSvc,
    useUpdateWorkspace,
    useGetWorkspaceByID
} from "@workspace/flow/workspace/workspace.service";
import { useNavigate, useLoaderData } from "react-router-dom";
const stepFields: Record<number, (keyof WorkspaceFormData)[]> = {
    1: ["name", "description", "thumbnail"],
    2: ["members"],
};
export default function useWorkspaceForm() {
    const loaderData = useLoaderData()
    let initData = {
        name: "",
        thumbnail: "",
        description: "",
        members: [
            {
                email: "", avg_salary: ""
            }
        ]
    }
    const { data: workspace } = useGetWorkspaceByID(loaderData?.workspaceId || "")

    if (loaderData && workspace) {

        initData = {
            name: workspace.name,
            thumbnail: workspace.image,
            description: workspace.description,
            members: workspace.workspace_members?.map((el) => ({
                avg_salary: String(el.avg_salary),
                email: el.users.email,
                id: String(el.user)
            })) ?? [
                    {
                        email: "", avg_salary: ""
                    }
                ]
        }
    }

    const form = useForm<WorkspaceFormData>({
        defaultValues: initData,
        resolver: zodResolver(WorkspaceFormSchema),
        mode: "all"
    })
    const navigate = useNavigate()
    const createMutation = useCreateWorkspaceSvc()
    const updateMutation = useUpdateWorkspace()
    const onSubmit = (values: WorkspaceFormData) => {
        if (loaderData && workspace) {
            updateMutation.mutate({ id: workspace.id, data: values }, {
                onSuccess: () => navigate("/")
            })
        } else {
            createMutation.mutate(values, {
                onSuccess: () => navigate("/")
            })
        }

    }
    const [step, changeStep] = React.useState<number>(1)
    const handleBack = () => {
        changeStep(prev => prev - 1)
    }
    const handleNext = () => {
        form.trigger(stepFields[step]).then((isValid) => {
            if (!isValid) return
            changeStep(prev => prev + 1)
        }, (e) => console.log(e))
    }
    React.useEffect(() => {console.log(form.formState.errors.members)} , [form.formState.errors.members])
    const pending = loaderData && workspace ? updateMutation.isPending : createMutation.isPending
    return {
        handleNext,
        handleBack,
        onSubmit,
        step,
        form,
        isLoading: pending
    }
}