import React from "react";
import { FormProvider, useForm, type FieldValues, type UseFormReturn } from "react-hook-form";
import X from "lucide-react/dist/esm/icons/x";
import Button from "./Button.component";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodEffects, ZodObject } from "zod";
import { flushSync } from "react-dom";
interface FormModal {
    schema: ZodObject<FieldValues> | ZodEffects<ZodObject<FieldValues>>,
    closeSideEffect?: () => void,
    submitSideEffect: (data: FieldValues) => void,
    modalFormContent?: React.ReactElement,
    parentForm: UseFormReturn<FieldValues>
}

const FormModal = ({
    parentForm,
    modalFormContent,
    schema,
    closeSideEffect,
    submitSideEffect,
}: FormModal, ref: React.ForwardedRef<FormModalRef>): React.JSX.Element => {
    const [isOpen, setOpen] = React.useState<boolean>(false)


    const modalForm = useForm<FieldValues>({
        resolver: zodResolver(schema)
    })
    const closeModal = () => {
        closeSideEffect?.()
        setOpen(false)
    }
    const submitForm = modalForm.handleSubmit(async (data: FieldValues) => {
        const valid = await modalForm.trigger()
        if (valid) {
            submitSideEffect?.(data)
            setOpen(false)
        }
    })
    const toogleOpen = (open?: boolean, data?: FieldValues) => {
        flushSync(() => {
            setOpen(prev => open !== undefined ? open : !prev);
        });
        if (data !== undefined) {
            modalForm.reset(data);
        }
    };
    React.useImperativeHandle(ref, () => {
        return {
            toogleOpen,
            modalForm
        }
    })
    if (!isOpen) return <></>
    return (
        <>
            <div className="fixed top-0 left-0 bg-black/20 z-1 w-screen h-screen"></div>
            <FormProvider {...modalForm}>
                <div className="space-y-4 rounded-2xl fixed top-1/2 left-1/2 w-1/3 -translate-1/2 bg-white z-10 p-10">
                    <X onClick={closeModal}
                        className="absolute top-4 right-4 cursor-pointer text-slate-600"
                    />
                    {React.cloneElement(modalFormContent || <></>, { modalForm, form: parentForm })}
                    <div className="flex items-center justify-between">
                        <Button onClick={closeModal}
                            className="bg-transparent border border-slate-400 text-slate-600 font-light!">
                            Cancel
                        </Button>
                        <Button onClick={submitForm}
                            className="bg-blue-500 text-white font-light!">
                            Add
                        </Button>
                    </div>
                </div>
            </FormProvider>
        </>
    )
}
export type FormModalRef = {
    toogleOpen: (open?: boolean, data?: FieldValues) => void,
    modalForm: UseFormReturn<FieldValues>
}
export default React.forwardRef<FormModalRef, FormModal>(FormModal)
