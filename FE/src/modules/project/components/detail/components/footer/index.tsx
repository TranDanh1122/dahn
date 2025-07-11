import React from "react";
import { ProjectContext } from "@project/components/detail";
import FooterItemComponent from "../FooterItem.component";
import CirclePlus from "lucide-react/dist/esm/icons/circle-plus";
import { ArrayForm } from "@/components/ArrayForm";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { envSchema } from "@/modules/project/models/request.schema";
import EnvironmentModal from "@project/components/form/Step2/Environment/modal/Environment.modal";


export default function Footer(): React.JSX.Element {
    const project = React.useContext(ProjectContext);

    const form = useForm({
        defaultValues: {
            "environment": project?.environment
        },
        resolver: zodResolver({
            "environment": envSchema
        })
    })
    return (<FormProvider {...form}>
        <ArrayForm
            triggerEl={<CirclePlus className="size-5 text-slate-600 absolute -top-10 right-0" />}
            name="environment"
            label=""
            itemEl={<FooterItemComponent />}
            modalFormSchema={envSchema}
            modalFormContent={<EnvironmentModal />}
        />

    </FormProvider>)
}