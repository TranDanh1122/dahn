import React from "react";
import FooterItemComponent from "../FooterItem.component";
import CirclePlus from "lucide-react/dist/esm/icons/circle-plus";
import { ArrayForm } from "@/components/ArrayForm";
import { FormProvider, useForm, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { envSchema, type EnvData } from "@/modules/project/models/request.schema";
import EnvironmentModal from "@project/components/form/Step2/Environment/modal/Environment.modal";
import { useSelector } from "react-redux";
import type { AppState } from "@/stores";
import { useUpdateEnvMutation } from "@project/flows/project/project.service";


export default React.memo(function Footer(): React.JSX.Element {
    const project = useSelector((state: AppState) => state.project.project);
    const form = useForm({
        defaultValues: {
            "environment": project?.environment
        },
        resolver: zodResolver({
            "environment": envSchema
        })
    })
    React.useEffect(() => {
        form.reset({ "environment": project?.environment })
    }, [project?.environment])

    const envUpdateMutation = useUpdateEnvMutation()
    const handleSubmit = (data: FieldValues, index?: string) => {
        if (project && project.id)
            console.log(data, index)
        // envUpdateMutation.mutate({ projectId: project.id, data: data as EnvData, envId: index })
    }
    return (<FormProvider {...form}>
        <ArrayForm
            triggerEl={<CirclePlus className="size-5 text-slate-600 absolute -top-10 right-0" />}
            name="environment"
            label=""
            customSubmit={handleSubmit}
            itemEl={<FooterItemComponent />}
            modalFormSchema={envSchema}
            modalFormContent={<EnvironmentModal />}
        />

    </FormProvider>)
})