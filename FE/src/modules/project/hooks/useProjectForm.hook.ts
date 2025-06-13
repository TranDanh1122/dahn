import useFormStep from "@/common/hooks/useFormStep";
import React from "react";
import { initData, ProjectSchema, type ProjectData } from "@project/models/request.schema";
import useScrollbar from "@/common/hooks/useScrollbar";
import { useNavigate } from "react-router-dom";
import useProjectService from "@project/flows/project/project.service";
const stepFields: Record<number, (keyof ProjectData)[]> = {
    1: ["name", "overview", "description", "type"],
    2: ["techstack", "environment"],
    3: ["milestones"],
    4: ["members", "role"],
    5: ["document", "communitation"]
};
export default function useProjectForm() {
    const {
        form,
        step,
        handleBack,
        handleNext
    } = useFormStep<ProjectData>({ initData, stepFields, schema: ProjectSchema });
    const isActive = React.useCallback((st: number) => (st == step ? "text-neutral-800" : "text-neutral-400"), [step]);
    const { createProject } = useProjectService()
    const navigate = useNavigate()
    const handleSubmit = (values: ProjectData) => {
        console.log(values)
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
        handleNext
    }
}