import { useModal } from "@/common/hooks/useModal";
import React from "react";
import {
    useFieldArray,
    useFormContext,
    type FieldValues,
    type UseFieldArrayReturn,
    type UseFormReturn
} from "react-hook-form"
import type { ZodObject } from "zod";

export interface ArrayFormContextProps {
    name: string,
    label: string,
    headerEl?: React.ReactElement,
    itemEl?: React.ReactElement,
    children?: React.ReactNode,
    modalFormContent?: React.ReactElement,
    modalFormSchema?: ZodObject<FieldValues>
}
interface ContextType extends Partial<UseFieldArrayReturn>, ArrayFormContextProps {
    handleClose?: () => void,
    handleOpen?: (index?: number) => void,
    upsert?: (data: FieldValues, index?: number) => void,
    modalState?: { index?: number, open: boolean },
    form?: UseFormReturn
}
export const ArrayFormContext = React.createContext<ContextType>({
    name: "",
    label: ""
})
export default function ArrayFormContextProvider({ children, ...props }: ArrayFormContextProps) {
    const form = useFormContext()
    const arrayField = useFieldArray({
        name: props.name,
        control: form.control
    })
    const { modalState, close, open } = useModal<{ index?: number, open: boolean }>()

    const handleClose = () => close({ open: false });

    const handleOpen = (index?: number) => open({ open: true, index });

    const upsert = (
        data: FieldValues,
        index?: number
    ) => {

        close({ open: false });
        if (typeof index == "number") {
            arrayField.update(index, data);
        } else {
            arrayField.append(data);
        }
    };
    return <ArrayFormContext.Provider
        value={
            {
                ...props,
                ...arrayField,
                modalState,
                handleClose,
                handleOpen,
                upsert,
                form
            }
        }>
        {children}
    </ArrayFormContext.Provider>
}