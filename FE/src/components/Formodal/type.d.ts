export type FormModalRef = {
    toogleOpen: (open?: boolean, data?: FieldValues) => void,
    modalForm: UseFormReturn<FieldValues>,
    isOpen: boolean
}