import React from "react";
import DetailStep from "./components/Step.component"
import { STEP_DETAILS } from "@project/const";
import { ProjectContext, StepContext } from "@project/components/detail";
import { useNavigate } from "react-router-dom";
import Text from "@components/Text.component";
import Skeleton from "@/components/Skeleton.component";

const Step1Modal = React.lazy(() => import("@project/components/detail/modals/Step1.modal"))
const MoreInfo = React.lazy(() => import("./components/MoreInfo.component"))
export default React.memo(function Overview(): React.JSX.Element {
    const project = React.useContext(ProjectContext)
    const { step, setStep } = React.useContext(StepContext)
    const handleChangeStep = React.useCallback((newStep: number) => {
        setStep?.(newStep)
    }, [])
    const navigate = useNavigate()
    const stepTabs = React.useMemo(() => {
        return STEP_DETAILS.map(el => (
            <DetailStep
                key={el.id}
                onClick={() => handleChangeStep(Number(el.id))}
                active={Number(el.id) == step}>
                <span className="text-slate-500 font-light">{el.id}</span>
                {el.name}
            </DetailStep>
        ))
    }, [step, handleChangeStep])


    return <>
        <h1 className="font-semibold uppercase text-4xl tracking-wide text-slate-600">
            {project?.name}
        </h1>
        <Text lineClamp="line-clamp-4" className="leading-6 text-slate-700 text-sm">
            {project?.overview}
        </Text>
        {
            <React.Suspense fallback={<Skeleton className="bg-slate-200 h-14 w-full" />}>
                <MoreInfo
                    label="Workspace: "
                    text={project?.workspace?.name || ""}
                    image={project?.workspace?.tiny || ""}
                    onClick={() => navigate(`/workspace/${project?.workspace?.id}`)}
                    hasRedirect
                    className="cursor-pointer"
                />
            </React.Suspense>
        }
        {
            <React.Suspense fallback={<Skeleton className="bg-slate-200 h-14 w-full" />}>
                <MoreInfo
                    label="Owner: "
                    text={project?.workspace?.owner?.full_name || project?.workspace?.owner?.email || ""}
                    image={project?.workspace?.owner?.avatar_url || ""}
                />
            </React.Suspense>
        }
        {
            <React.Suspense fallback={<Skeleton className="bg-slate-200 h-8 w-52" />}>
                <Step1Modal project={project} />
            </React.Suspense>
        }

        <div className="space-y-6 text-left text-slate-700">
            {stepTabs}
        </div >

    </>
}) 