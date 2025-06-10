import React from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import X from "lucide-react/dist/esm/icons/x";
import Button from "@components/Button.component";

export default function FormModal(): React.JSX.Element {

    const form = useFormContext();
    const defaultValues = React.useMemo(() => {
        return typeof index == "number"
            ? form.getValues(`milestones.${index}`)
            : {}
    }, [props.index, form])
    const modalForm = useForm<T>({});


    return (
        <>
            <div className="fixed top-0 left-0 bg-black/20 z-1 w-screen h-screen"></div>
            <FormProvider {...modalForm}>
                <div className="space-y-4 rounded-2xl fixed top-1/2 left-1/2 w-1/3 -translate-1/2 bg-white z-10 p-8">
                    <X onClick={handleClose}
                        className="absolute top-4 right-4 cursor-pointer text-neutral-600"
                    />
                    {
                        React.isValidElement(children)
                            ? React.cloneElement(children)
                            : children
                    }

                    <div className="flex items-center justify-between">
                        <Button onClick={handleClose}
                            className="bg-transparent border border-neutral-400 text-neutral-600 font-light!">
                            Cancel
                        </Button>
                        <Button onClick={modalForm.handleSubmit(onSubmit)}
                            className="bg-blue-500 text-white font-light!">
                            Add
                        </Button>
                    </div>
                </div>
            </FormProvider>
        </>
    )
}