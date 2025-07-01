import React from "react";
import Step1 from "@project/components/form/Step1";
import { step1Schema } from "@project/models/request.schema";
import type { FormModalRef } from "@components/FormModal.component";
const FormModalComponent = React.lazy(() => import("@components/FormModal.component"))
export default function Step1Modal(): React.JSX.Element {
    const modalRef = React.useRef<FormModalRef | null>(null)
    React.useEffect(() => {
        modalRef.current?.toogleOpen(true)
    }, [])
    return <FormModalComponent
        ref={modalRef}
        schema={step1Schema}
        modalFormContent={<Step1 />}
        submitSideEffect={() => { }}
    />

}