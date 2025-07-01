import React from "react";
import { FormProvider, useForm, type FieldValues, type UseFormReturn } from "react-hook-form";
import X from "lucide-react/dist/esm/icons/x";
import Button from "../Button.component";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodEffects, ZodObject } from "zod";
import type { FormModalRef } from "./type";
interface FormModal {
    schema: ZodObject<FieldValues> | ZodEffects<ZodObject<FieldValues>>,
    closeSideEffect?: () => void,
    submitSideEffect: (data: FieldValues) => void,
    modalFormContent?: React.ReactElement,
    parentForm?: UseFormReturn<FieldValues>,
    onMouted?: () => void
}
/**
 * 
 * @param parentForm - parent form of this form 
 * @param modalFormContent - list of input in form
 * @param schema - schema validate form
 * @param closeSideEffect - do something when close
 * @param submitSideEffect - do something when form submit
 * @param onMouted - do something when modal ready (loaded) - ussually use with lazyload
 * @returns 
 */
const FormModal = ({
    parentForm,
    modalFormContent,
    schema,
    closeSideEffect,
    submitSideEffect,
    onMouted,
}: FormModal, ref: React.ForwardedRef<FormModalRef>): React.JSX.Element => {
    const [isOpen, setOpen] = React.useState<{ state: boolean, data?: FieldValues }>({ state: false })

    React.useEffect(() => {
        onMouted?.()
    }, [])
    const modalForm = useForm<FieldValues>({
        resolver: zodResolver(schema)
    })

    const closeModal = () => {
        closeSideEffect?.()
        setOpen(prev => ({ ...prev, state: false }))
    }
    const submitForm = modalForm.handleSubmit(async (data: FieldValues) => {
        const valid = await modalForm.trigger()
        if (valid) {
            submitSideEffect?.(data)
            setOpen({ state: false })
        }
    })
    /**
     * open modal, and you can put default data to you form
     * @param open 
     * @param data 
     */
    const toogleOpen = (open?: boolean, data?: FieldValues) => {
        setOpen(prev => {
            const state = open !== undefined ? open : !prev
            return {
                state,
                data
            }
        });
    };
    React.useEffect(() => {
        if (isOpen.data) {
            modalForm.reset(isOpen.data)
        } else {
            const emptyForm = Object.fromEntries(
                Object.keys(modalForm.getValues()).map(key => [key, ''])
            )
            modalForm.reset(emptyForm)
        }
    }, [isOpen.data])

    React.useImperativeHandle(ref, () => {
        return {
            toogleOpen,
            modalForm,
            isOpen: isOpen.state
        }
    })
    if (!isOpen.state) return <></>
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

export default React.forwardRef<FormModalRef, FormModal>(FormModal)
