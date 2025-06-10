import { zodResolver } from "@hookform/resolvers/zod";
import { roleSchema, roleSchemaInitData } from "@project/models/request.schema";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import X from "lucide-react/dist/esm/icons/x";
import Input from "@/components/Input.component";

export default function Role(): React.JSX.Element {
    const roleForm = useForm<z.infer<typeof roleSchema>>({
        resolver: zodResolver(roleSchema),
        defaultValues: roleSchemaInitData
    })

    return (
        <>
            <div className="fixed top-0 left-0 bg-black/20 z-1 w-screen h-screen"></div>
            <FormProvider {...roleForm}>
                <div className="space-y-4 rounded-2xl fixed top-1/2 left-1/2 w-1/3 -translate-1/2 bg-white z-10 p-8">
                    <X className="absolute top-4 right-4 cursor-pointer text-neutral-600"
                    />
                    <div className="flex items-end gap-4">

                        <Input
                            placeholder="eg: QA/PM/DEV/TechLead"
                            fieldsetClass="w-full"
                            {...roleForm.register(`name`)}
                        />

                        <Input hidden
                            {...roleForm.register(`id`)}
                        />
                    </div>
                </div>
            </FormProvider>
        </>
    )
}