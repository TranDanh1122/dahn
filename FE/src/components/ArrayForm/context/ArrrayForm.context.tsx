import { useModal } from "@/common/hooks/useModal";
import React from "react";
import { useFieldArray, useFormContext, type UseFieldArrayReturn, type UseFormReturn } from "react-hook-form"
export interface ArrayFormContextProps {
    name: string,
    label: string,
    headerEl?: React.ReactElement,
    itemEl?: React.ReactElement,
    children?: React.ReactNode,
    modalForm?: React.ReactElement,
}
interface ContextType<T> extends Partial<UseFieldArrayReturn>, ArrayFormContextProps {
    handleClose?: () => void,
    handleOpen?: (index?: number) => void,
    upsert?: (data: T, index?: number) => void,
    modalState?: { index?: number, open: boolean },
    form?: UseFormReturn
}
export const ArrayFormContext = React.createContext<ContextType<any>>({
    name: "",
    label: ""
})
export default function ArrayFormContextProvider<T>({ children, ...props }: ArrayFormContextProps) {
    const form = useFormContext()
    const arrayField = useFieldArray({
        name: props.name,
        control: form.control
    })
    const { modalState, close, open } = useModal<{ index?: number, open: boolean }>()

    const handleClose = () => close({ open: false });

    const handleOpen = (index?: number) => open({ open: true, index });

    const upsert = (
        data: T,
        index?: number
    ) => {
        close({ open: false });
        if (typeof index == "number") {
            arrayField.update(index, data);
        } else {
            arrayField.append(data);
        }
    };
    return <ArrayFormContext.Provider value={{ ...props, ...arrayField, modalState, handleClose, handleOpen, upsert, form }}>
        {children}
    </ArrayFormContext.Provider>
}