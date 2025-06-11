import Picker from "@components/Picker.component";
import React from "react";
import { useStep2Hook } from "./useStep2.hook";
import { ArrayForm } from "@/components/ArrayForm";
import { envSchema } from "@project/models/request.schema";
import { EnvTableHeader, EnvironmentModal, EnvTableItem } from "./Environment"
export default function Step2(): React.JSX.Element {
    const {
        isLoading,
        isError,
        techstacks,
        form,
    } = useStep2Hook()
    return <div className="space-y-4" >
        <Picker
            dataSet={(isLoading || isError) ? [] : techstacks || []}
            data={form.getValues("techstack")?.split(",") ?? []}
            onItemClick={(val) => form.setValue("techstack", val)}
        />
        <ArrayForm
            label="Environments"
            name="environment"
            headerEl={<EnvTableHeader />}
            itemEl={<EnvTableItem />}
            modelFormSchema={envSchema}
            modalFormContent={<EnvironmentModal />}
        />

    </div>
}