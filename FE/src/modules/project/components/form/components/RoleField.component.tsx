import { useModal } from "@/common/hooks/useModal";
import Button from "@components/Button.component";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import RoleModal from "./modal/Role/Role.modal";
export default React.memo(function RoleField(): React.JSX.Element {
    const form = useFormContext()
    const { fields: roles, append, remove } = useFieldArray({
        control: form.control,
        name: "role"
    })
    const { modalState, close, open } = useModal<{ index?: number, open: boolean }>()
    React.useEffect(() => {
        console.log(modalState)
    }, [modalState])
    return <fieldset className="space-y-2">
        <div className="flex items-center gap-2">
            <legend className="text-neutral-600">Roles</legend>
            <Button
                className="
                    font-light! text-neutral-600
                    border border-neutral-400 
                    rounded-full! p-0! size-6
                    flex items-center justify-center"
                type="button"
                onClick={() => append({ name: "", id: "" })}>
                +
            </Button>
        </div>
        {
            modalState.open && <RoleModal />
        }
    </fieldset>
})