import type { FieldValues, UseFormReturn } from "react-hook-form"

export { default as ArrayForm } from "./views/ArrayForm.view"

export interface ModalProps<T extends FieldValues> {
    modalForm?: UseFormReturn<T>
    form?: UseFormReturn
}
export interface TableItemProps {
    data?: FieldValues,
    handleOpen?: () => void
    removeItem?: () => void
}