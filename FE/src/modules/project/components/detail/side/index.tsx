import React from "react";
import DetailStep from "./components/Step.component"
import SquarePen from "lucide-react/dist/esm/icons/square-pen";
import { STEPS } from "@project/const";
interface OverviewProps {
    projectName?: string
    projectOverview?: string
}
export default React.memo(function Overview({ projectName, projectOverview }: OverviewProps): React.JSX.Element {
    return <>
        <h1 className="font-semibold uppercase text-7xl tracking-wide text-slate-600">
            {projectName}
        </h1>
        <p className="line-clamp-4 leading-6 text-slate-700">
            {projectOverview}

            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Laudantium, consequatur reprehenderit placeat qui quibusdam
            ipsam vero et illum dolorem reiciendis recusandae! Atque
            asperiores similique earum modi consectetur illum possimus
            debitis. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Fugiat aspernatur vero neque quia ipsam repellendus est
            inventore quam tempore temporibus dolore magnam alias totam aut,
            omnis consectetur, soluta hic reprehenderit!
        </p>
        <p className="flex items-center gap-2">
            <span className="text-slate-600 text-sm">General Infomation Edit:</span>
            <SquarePen className="size-5 text-slate-500 cursor-pointer" />
        </p>
        <div className="flex flex-col justify-stretch gap-6 text-left text-slate-700">
            {
                STEPS.map(el => <DetailStep>
                    <span className="text-slate-500 font-light">{el.id}</span>
                    {el.name}
                </DetailStep>)
            }
        </div>

    </>
}) 