import React from "react";
import DetailStep from "./components/Step.component"
import SquarePen from "lucide-react/dist/esm/icons/square-pen";
import { STEP_DETAILS } from "@project/const";
import { ProjectContext, StepContext } from "@project/components/detail";
import { useNavigate } from "react-router-dom";
import MoreInfo from "./components/MoreInfo.component";
import Text from "@components/Text.component";
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
        <Text lineClamp="line-clamp-4 " className="leading-6 text-slate-700 text-sm">
            {project?.overview}

            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Laudantium, consequatur reprehenderit placeat qui quibusdam
            ipsam vero et illum dolorem reiciendis recusandae! Atque
            asperiores similique earum modi consectetur illum possimus
            debitis. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Fugiat aspernatur vero neque quia ipsam repellendus est
            inventore quam tempore temporibus dolore magnam alias totam aut,
            omnis consectetur, soluta hic reprehenderit!
        </Text>

        <MoreInfo
            label="Workspace: "
            text={project?.workspace?.name || ""}
            image={project?.workspace?.tiny || ""}
            onClick={() => navigate(`/workspace/${project?.workspace?.id}`)}
            hasRedirect
            className="cursor-pointer"
        />
        <MoreInfo
            label="Owner: "
            text={project?.workspace?.owner?.full_name || project?.workspace?.owner?.email || ""}
            image={project?.workspace?.owner?.avatar_url || ""}
        />


        <p className="flex items-center gap-2">
            <span className="text-slate-600 text-sm">General Infomation Edit:</span>
            <SquarePen className="size-5 text-slate-500 cursor-pointer" />
        </p>
        <div className="space-y-6 text-left text-slate-700">
            {stepTabs}
        </div >

    </>
}) 