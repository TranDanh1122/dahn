import React from "react";
import SquarePen from "lucide-react/dist/esm/icons/square-pen";
import FormModal from "@components/Formodal/FormModal.component";
import Skeleton from "@components/Skeleton.component";
import type { ZodEffects, ZodObject } from "zod";
import type { FieldValues } from "react-hook-form";
import type { FormModalRef } from "@components/Formodal/type";
interface ModalProps {
    submitHandler: () => void,
    schema: ZodObject<FieldValues> | ZodEffects<ZodObject<FieldValues>>,
    initData: unknown,
    onLoading?: boolean,
    contentEl?: React.ReactElement,
    triggerEl?: React.ReactElement,
    contentProps: object
}
export default function Modal({ submitHandler, schema, initData, onLoading, contentEl, contentProps, triggerEl }: ModalProps): React.JSX.Element {

    const modalRef = React.useRef<FormModalRef | null>(null);

    const [state, setState] = React.useState<{ open: boolean; mounted: boolean }>(
        { open: false, mounted: false }
    );
    React.useEffect(() => {
        if (!state.open || !state.mounted) return;
        modalRef.current?.toogleOpen(true, initData);
    }, [state, initData]);

    return (
        <>
            {React.cloneElement(triggerEl || <></>, { onClick: () => setState((prev) => ({ ...prev, open: true })) })}
            {state.open && (
                <React.Suspense
                    fallback={
                        <Skeleton className="fixed top-0 left-0 bg-black/20 z-1 w-screen h-screen" />
                    }>
                    <FormModal
                        ref={modalRef}
                        schema={schema}
                        modalFormContent={React.cloneElement(contentEl || <></>, { modalRef, ...contentProps })}
                        closeSideEffect={() => setState((prev) => ({ ...prev, open: false }))}
                        submitSideEffect={submitHandler}
                        onMouted={() => setState((prev) => ({ ...prev, mounted: true }))}
                        onLoading={onLoading}
                    />
                </React.Suspense>
            )}
        </>
    );

}