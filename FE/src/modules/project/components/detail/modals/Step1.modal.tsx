import React from "react";
import Step1 from "@project/components/form/Step1";
import { useGetTechstacksSvc } from "@project/flows/techstack";
import Picker from "@components/Picker.component";
import { step1Schema, type Project } from "@project/models";
import type { ModalProps } from "@/components/ArrayForm";
import type { z } from "zod";
import DetailEditModal from "./DetailEditModal";
import SquarePen from "lucide-react/dist/esm/icons/square-pen";
import type { FieldValues } from "react-hook-form";
import { updateProjectThunk } from "@project/store/action/updateGeneralInfo.action";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/stores";



const FormContent: React.FC<ModalProps<z.infer<typeof step1Schema>>> = ({ modalForm }): React.JSX.Element => {
    const { data: techstacks, isLoading, isError } = useGetTechstacksSvc();
    return (
        <div>
            <Step1 />
            <Picker
                dataSet={isLoading || isError ? [] : techstacks || []}
                data={modalForm?.getValues("techstack")?.split(",") || []}
                onItemClick={(val) =>
                    modalForm?.setValue("techstack", val)
                }
            />
        </div>
    )
}

const Step1Modal = ({ project }: { project?: Project }) => {
    const dispatch: AppDispatch = useDispatch()
    const submitHandler = async (values: FieldValues) => {
        if (project && project.id)
            dispatch(updateProjectThunk({ projectId: project.id, data: values as z.infer<typeof step1Schema>, fallbackData: project }))
    }
    return <DetailEditModal
        contentEl={<FormContent />}
        initData={project}
        schema={step1Schema}
        submitHandler={submitHandler}
        triggerEl={<p className="flex items-center gap-2">
            <span className="text-slate-600 text-sm">General Infomation Edit:</span>
            <SquarePen className="size-5 text-slate-500 cursor-pointer" />
        </p>}
    />
}
export default Step1Modal