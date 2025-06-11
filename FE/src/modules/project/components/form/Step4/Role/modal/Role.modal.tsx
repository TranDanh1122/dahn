
import React from "react";
import Input from "@/components/Input.component";
import type { ModalProps } from "@components/ArrayForm";

export default function Role({ modalForm }: ModalProps): React.JSX.Element {

    if (!modalForm) return <></>

    return (
        <>
            <Input
                placeholder="eg: QA/PM/DEV/TechLead"
                fieldsetClass="w-full"
                {...modalForm.register(`name`)}
            />
            <Input hidden
                {...modalForm.register(`id`)}
            />
        </>
    )
}