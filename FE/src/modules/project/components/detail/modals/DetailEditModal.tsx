import React from "react";
import FormModal from "@components/Formodal/FormModal.component";
import type { ZodEffects, ZodObject } from "zod";
import type { FieldValues } from "react-hook-form";
interface ModalProps {
    submitHandler: (data: FieldValues) => void | Promise<void>,
    schema: ZodObject<FieldValues> | ZodEffects<ZodObject<FieldValues>>,
    initData?: FieldValues,
    onLoading?: boolean,
    contentEl?: React.ReactElement,
    triggerEl?: React.ReactElement,
}
export default function Modal({ submitHandler, schema, onLoading, contentEl, triggerEl, initData }: ModalProps): React.JSX.Element {

    const [state, setState] = React.useState<boolean>(false);

    return (
        <>
            {React.cloneElement(triggerEl || <></>, { onClick: () => setState(true) })}
            {state && (
                <FormModal
                    initData={initData}
                    schema={schema}
                    modalFormContent={contentEl}
                    closeAction={() => setState(false)}
                    submitAction={async (data) => { await submitHandler(data); setState(false) }}
                    onLoading={onLoading}
                />
            )}
        </>
    );

}