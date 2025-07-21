import React from "react";
import { FormProvider, useForm, type FieldValues, type UseFormReturn } from "react-hook-form";
import X from "lucide-react/dist/esm/icons/x";
import Button from "../Button.component";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodEffects, ZodObject } from "zod";
import LoadingComponent from "@components/Loading.component";
import { createPortal } from "react-dom";
interface FormModal {
    schema?: ZodObject<FieldValues> | ZodEffects<ZodObject<FieldValues>>,
    closeAction?: () => void,
    submitAction: ((data: FieldValues) => void) | ((data: FieldValues) => Promise<unknown>),
    modalFormContent?: React.ReactElement,
    parentForm?: UseFormReturn<FieldValues>,
    onLoading?: boolean,
    initData?: FieldValues
}
/**
 * 
 * @param parentForm - parent form of this form 
 * @param modalFormContent - list of input in form
 * @param schema - schema validate form
 * @param closeSideEffect - do something when close
 * @param submitSideEffect - do something when form submit
 * @param onLoading - loading state
 * @returns 
 */
const FormModal = ({
    parentForm,
    modalFormContent,
    schema,
    closeAction,
    submitAction,
    // onMouted,
    initData,
    onLoading
}: FormModal): React.JSX.Element => {

    const modalForm = useForm<FieldValues>({
        resolver: zodResolver(schema),
        defaultValues: initData
    })

    const submitForm = async (data: FieldValues) => {
        await modalForm.trigger()

        if (modalForm.formState.isValid)
            submitAction?.(data)
    };

    React.useEffect(() => {
        if (initData) {
            modalForm.reset(initData)
        } else {
            const emptyForm = Object.fromEntries(
                Object.keys(modalForm.getValues()).map(key => [key, ''])
            )
            modalForm.reset(emptyForm)
        }
    }, [initData])

    return (
        <>
            {
                createPortal(
                    <>
                        <div className="fixed top-0 left-0 bg-black/20 z-1 w-screen h-screen"></div>
                        <FormProvider {...modalForm}>
                            <form className="space-y-4 rounded-2xl fixed top-1/2 left-1/2 w-1/3 -translate-1/2 bg-white z-10 p-10">
                                <X onClick={closeAction}
                                    className="absolute top-4 right-4 cursor-pointer text-slate-600"
                                />
                                {React.cloneElement(modalFormContent || <></>, { modalForm, form: parentForm })}
                                <div className="flex items-center justify-between">
                                    <Button onClick={closeAction} type="button"
                                        className="bg-transparent border border-slate-400 text-slate-600 font-light!">
                                        Cancel
                                    </Button>
                                    <Button type="button" onClick={modalForm.handleSubmit(submitForm, (e) => console.log(e))}
                                        className="bg-blue-500 text-white font-light!">
                                        {
                                            !onLoading && "Add"
                                        }
                                        {
                                            onLoading && <LoadingComponent className="border-s-white" />
                                        }
                                    </Button>
                                </div>
                            </form>
                        </FormProvider>

                    </>,
                    document.body
                )
            }
        </>
    )
}

export default FormModal
