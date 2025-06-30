import React from "react";
import X from "lucide-react/dist/esm/icons/x";
import CirclePlus from "lucide-react/dist/esm/icons/circle-plus";
import FormModal from "@components/FormModal.component";
import type { ZodEffects, ZodObject } from "zod";
import { type FieldValues } from "react-hook-form";
import useArrayForm from "./useArrayForm";

/**
 * @param {string} name - Name of array fields
 * @param {string} label - Description of what this field is
 * @param {React.ReactElement} [headerEl] - Header of table you need when displaying added items
 * @param {React.ReactElement} [itemEl] - React element for each item
 * @param {React.ReactNode} [children] - React children nodes
 * @param {React.ReactElement} [modalFormContent] - React element for modal form content
 * @param {import('zod').ZodObject<import('react-hook-form').FieldValues>} [modalFormSchema] - ZodObject<FieldValues> for form schema
 * @returns {JSX.Element}
 */
export interface ArrayFormProps {
    name: string,
    label: string,
    headerEl?: React.ReactElement,
    itemEl?: React.ReactElement,
    modalFormContent?: React.ReactElement,
    modalFormSchema?: ZodEffects<ZodObject<FieldValues>> | ZodObject<FieldValues>
}
export default
    function ArrayForm(
        {
            name,
            label,
            headerEl,
            itemEl,
            modalFormContent,
            modalFormSchema
        }: ArrayFormProps): React.JSX.Element {

    const {
        modalRef,
        fields,
        remove,
        form,
        handleItemClick,
        upsert,
        handleOpen,
    } = useArrayForm(name)
    return (
        <>
            <fieldset className="space-y-2" >
                <div className="flex items-center gap-2 te">
                    <legend className="text-slate-600 font-light text-sm">{label}</legend>
                    <CirclePlus
                        onClick={handleOpen}
                        className="font-light! text-slate-600 size-5 
                                    flex items-center justify-center"
                    />
                </div>

                {
                    fields && headerEl && <>{headerEl}</>
                }
                {
                    fields &&
                    fields.map(
                        (el, index) => (
                            <div onClick={() => handleItemClick(index)} key={el.id}
                                className="py-4 border-b text-sm border-slate-200 grid grid-cols-5 items-center cursor-pointer hover:bg-slate-100 hover:rounded-lg hover:px-2 hover:shadow">
                                {
                                    React.cloneElement(itemEl || <></>, {
                                        data: form?.getValues(`${name}.${index}`)
                                    })
                                }
                                <X onClick={
                                    (e: React.MouseEvent) => {
                                        e.stopPropagation()
                                        remove?.(index);
                                    }}
                                    className="text-slate-600 font-light hover:text-red-500 cursor-pointer mx-auto"
                                />
                            </div>

                        )
                    )}
            </fieldset >
            {
                modalFormSchema && (
                    <FormModal
                        parentForm={form}
                        modalFormContent={modalFormContent}
                        ref={modalRef}
                        submitSideEffect={(values) => upsert?.(values)}
                        schema={modalFormSchema} />

                )
            }
        </>
    )
}