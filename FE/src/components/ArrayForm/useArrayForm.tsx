import React from "react";
import { useFieldArray, useFormContext, type FieldValues } from "react-hook-form";
import type { FormModalRef } from "@/components/Formodal/type";
const useArrayForm = (name: string) => {
    const form = useFormContext()
    const { fields, remove, update, append } = useFieldArray({
        name: name,
        control: form.control
    })
    const [currentIndex, setCurrentIndex] = React.useState<number>(-1)

    const upsert = (
        data: FieldValues,
    ) => {
        if (currentIndex >= 0) {
            update(currentIndex, data);
        } else {
            append(data);
        }
    };

    const handleItemClick = (index: number) => {
        setCurrentIndex(index)
        modalRef.current?.toogleOpen(true, form.watch(`${name}.${index}`))
    }
    const handleOpen = () => {
        setCurrentIndex(-1)
        modalRef.current?.toogleOpen(true)
    }
    const modalRef = React.useRef<FormModalRef>(null)
    return {
        modalRef,
        handleItemClick,
        upsert,
        fields,
        remove,
        form,
        handleOpen,
        currentIndex
    }
}
export default useArrayForm