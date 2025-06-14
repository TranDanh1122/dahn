import { WorkspaceFormSchema, type WorkspaceFormData } from "@workspace/models/request.schema"
import {
    useCreateWorkspaceSvc,
    useUpdateWorkspace,
    useGetWorkspaceByID
} from "@workspace/flow/workspace/workspace.service";
import { useNavigate, useLoaderData } from "react-router-dom";
import { base64ToFile, isBase64Image } from "@/common/ults/Tool"
import useFormStep from "@/common/hooks/useFormStep";
import React from "react";
const stepFields: Record<number, (keyof WorkspaceFormData)[]> = {
    1: ["name", "description", "thumbnail"],
    2: ["members"],
};
export default function useWorkspaceForm() {

    const loaderData = useLoaderData()
    const { data: workspace } = useGetWorkspaceByID(loaderData?.workspaceId || "")

    const initData = React.useMemo(() => {
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
        if (!loaderData || !workspace) return initData
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
        return initData
    }, [loaderData, workspace])


    const {
        form,
        handleBack,
        handleNext,
        step
    } = useFormStep<WorkspaceFormData>(
        {
            initData,
            stepFields,
            schema: WorkspaceFormSchema
        })
    const navigate = useNavigate()
    const createMutation = useCreateWorkspaceSvc()
    const updateMutation = useUpdateWorkspace()
    const onSubmit = (values: WorkspaceFormData) => {
        const thumb = values.thumbnail || ""
        const formData = new FormData()
        formData.append("name", values.name)
        formData.append("members", JSON.stringify(values.members || []))
        formData.append("description", values.description || "")
        formData.append("thumbnail", isBase64Image(thumb) ? base64ToFile(thumb) : thumb)

        if (loaderData && workspace) {
            updateMutation.mutate({ id: workspace.id, data: formData }, {
                onSuccess: () => navigate("/")
            })
        } else {
            createMutation.mutate(formData, {
                onSuccess: () => navigate("/")
            })
        }

    }

    const pending = loaderData && workspace
        ? updateMutation.isPending
        : createMutation.isPending
    return {
        handleNext,
        handleBack,
        onSubmit,
        step,
        form,
        isLoading: pending
    }
}