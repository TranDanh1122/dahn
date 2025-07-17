import React from "react";
import FooterItemComponent from "../FooterItem.component";
import CirclePlus from "lucide-react/dist/esm/icons/circle-plus";
import { ArrayForm } from "@/components/ArrayForm";
import { FormProvider, useForm, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { envSchema, type EnvData } from "@project/models/request.schema";
import EnvironmentModal from "@project/components/form/Step2/Environment/modal/Environment.modal";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, AppState } from "@/stores";
import { updateEnvThunk } from "@project/store/action/updateEnv.action";
import { isObjectEqual } from "@/common/ults/Tool";


export default React.memo(function Footer(): React.JSX.Element {
    const project = useSelector((state: AppState) => state.project.project);
    const env = React.useMemo(() => {
        return [...(project?.environment || [])].sort((a, b) => {
            return (parseInt(a.id || "")) - parseInt(b.id || "");
        }) || []
    }, [project?.environment])
    const form = useForm({
        defaultValues: {
            "environment": env
        },
        resolver: zodResolver({
            "environment": envSchema
        })
    })
    React.useEffect(() => {
        const current = form.getValues("environment");
        if (!isObjectEqual(current, env)) {
            form.reset({ environment: env });
        }
    }, [env])

    const dispatch: AppDispatch = useDispatch()
    const handleSubmit = (data: FieldValues) => {
        if (project && project.id)
            dispatch(updateEnvThunk({ projectId: project.id, data: data as EnvData, fallbackData: project }))
    }
    return (<FormProvider {...form}>
        <ArrayForm
            triggerEl={env.length < 4 ? <CirclePlus className="size-5 text-slate-600 absolute -top-10 right-0" /> : <></>}
            name="environment"
            label=""
            customSubmit={handleSubmit}
            itemEl={<FooterItemComponent />}
            modalFormSchema={envSchema}
            modalFormContent={<EnvironmentModal />}
        />

    </FormProvider>)
})