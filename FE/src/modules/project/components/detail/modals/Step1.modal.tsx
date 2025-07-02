import React from "react";
import Step1 from "@project/components/form/Step1";
import type { FormModalRef } from "@components/Formodal/type";
import SquarePen from "lucide-react/dist/esm/icons/square-pen";
import SkeletonComponent from "@components/Skeleton.component";
import { useGetTechstacksSvc } from "@project/flows/techstack";
import Picker from "@components/Picker.component";
import { ProjectContext } from "@project/components/detail";
import type { FieldValues } from "react-hook-form";
import { useUpdateGeneralInfoMutation } from "@project/flows/project/project.service";
import type { z } from "zod";
import { type Project, step1Schema } from "@project/models";

const FormModalComponent = React.lazy(
    () => import("@components/Formodal/FormModal.component")
);
export default function Step1Modal(): React.JSX.Element {
    const modalRef = React.useRef<FormModalRef | null>(null);
    const project = React.useContext(ProjectContext);
    const initData = React.useMemo(() => {
        return Object.fromEntries(
            Object.keys(step1Schema.shape).map((el) => [
                el,
                project?.[el as keyof typeof project],
            ])
        );
    }, [project]);
    const [state, setState] = React.useState<{ open: boolean; mounted: boolean }>(
        { open: false, mounted: false }
    );
    React.useEffect(() => {
        if (!state.open || !state.mounted) return;
        modalRef.current?.toogleOpen(true, initData);
    }, [state, initData]);
    const updateGeneralInfoMutation = useUpdateGeneralInfoMutation();
    const submitHanler = (data: FieldValues) => {
        if (!project || !project.id) throw new Error("Project not found");
        updateGeneralInfoMutation.mutate({
            projectId: project.id,
            data: data as z.infer<typeof step1Schema>,
        }, {
            onSuccess: () => {
                setState({ open: false, mounted: false })
            }
        });
    };
    return (
        <>
            <p
                onClick={() => setState((prev) => ({ ...prev, open: true }))}
                className="flex items-center gap-2">
                <span className="text-slate-600 text-sm">General Infomation Edit:</span>
                <SquarePen className="size-5 text-slate-500 cursor-pointer" />
            </p>
            {state.open && (
                <React.Suspense
                    fallback={
                        <SkeletonComponent className="fixed top-0 left-0 bg-black/20 z-1 w-screen h-screen" />
                    }>
                    <FormModalComponent
                        ref={modalRef}
                        schema={step1Schema}
                        modalFormContent={<FormContent modalRef={modalRef} project={project} />}
                        closeSideEffect={() => setState((prev) => ({ ...prev, open: false }))}
                        submitSideEffect={submitHanler}
                        onMouted={() => setState((prev) => ({ ...prev, mounted: true }))}
                        onLoading={updateGeneralInfoMutation.isPending}
                    />
                </React.Suspense>
            )}
        </>
    );
}
interface FormContentProps {
    modalRef: React.RefObject<FormModalRef | null>,
    project?: Project
}
const FormContent: React.FC<FormContentProps> = ({ project, modalRef }: FormContentProps): React.JSX.Element => {
    const { data: techstacks, isLoading, isError } = useGetTechstacksSvc();
    return (
        <div>
            <Step1 />
            <Picker
                dataSet={isLoading || isError ? [] : techstacks || []}
                data={project?.techstack.split(",")}
                onItemClick={(val) =>
                    modalRef.current?.modalForm.setValue("techstack", val)
                }
            />
        </div>
    )
} 