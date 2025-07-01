import React from "react";
import Step1 from "@project/components/form/Step1";
import { step1Schema } from "@project/models/request.schema";
import type { FormModalRef } from "@/components/Formodal/type";
import SquarePen from "lucide-react/dist/esm/icons/square-pen";
import SkeletonComponent from "@/components/Skeleton.component";

const FormModalComponent = React.lazy(() => import("@/components/Formodal/FormModal.component"))
export default function Step1Modal(): React.JSX.Element {
    const modalRef = React.useRef<FormModalRef | null>(null)
    const [state, setState] = React.useState<{ open: boolean, mounted: boolean }>({ open: false, mounted: false })
    React.useEffect(() => {
        if (!state.open || !state.mounted) return;
        modalRef.current?.toogleOpen(true);
    }, [state])
    return (
        <>

            <p onClick={() => setState((prev) => ({ ...prev, open: true }))} className="flex items-center gap-2">
                <span className="text-slate-600 text-sm">General Infomation Edit:</span>
                <SquarePen className="size-5 text-slate-500 cursor-pointer" />
            </p>
            {
                state.open &&
                <React.Suspense fallback={<SkeletonComponent className="fixed top-0 left-0 bg-black/20 z-1 w-screen h-screen" />}>
                    <FormModalComponent
                        ref={modalRef}
                        schema={step1Schema}
                        modalFormContent={<Step1 />}
                        closeSideEffect={() => { setState((prev) => ({ ...prev, open: false })) }}
                        submitSideEffect={() => { }}
                        onMouted={() => setState((prev) => ({ ...prev, mounted: true }))}
                    />
                </React.Suspense>
            }
        </>
    )
}