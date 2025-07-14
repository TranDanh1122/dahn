import useFormStep from "@/common/hooks/useFormStep";
import React from "react";
import { initData, ProjectSchema, type ProjectData } from "@project/models/request.schema";
import useScrollbar from "@/common/hooks/useScrollbar";
import { useNavigate } from "react-router-dom";
import { useCreateProjectMutation } from "@project/flows/project";
import { useSelector } from "react-redux";
import type { AppState } from "@/stores";
const stepFields: Record<number, (keyof ProjectData)[]> = {
    1: ["name", "overview", "description", "type"],
    2: ["techstack", "environment"],
    3: ["milestones"],
    4: ["members", "role"],
    5: ["document", "communitation"]
};
export default function useProjectForm() {
    const workspace = useSelector((state: AppState) => state.persist.workspace.currentWorkspace)
    const initialData = { ...initData, workspaceID: workspace?.id || "" }
    const {
        form,
        step,
        handleBack,
        handleNext
    } = useFormStep<ProjectData>({ initData: initialData, stepFields, schema: ProjectSchema });
    const isActive = React.useCallback((st: number) => (st == step ? "text-slate-800" : "text-slate-400"), [step]);
    const createProject = useCreateProjectMutation()
    const navigate = useNavigate()
    const handleSubmit = (values: ProjectData) => {
        createProject.mutate(values, {
            onSuccess: () => {
                navigate("/")
            }
        })
    }
    const ref = useScrollbar<HTMLFormElement>(window.innerHeight)

    return {
        stepFields,
        form,
        step,
        isActive,
        ref,
        handleSubmit,
        handleBack,
        handleNext,
        loading: createProject.isPending
    }
}