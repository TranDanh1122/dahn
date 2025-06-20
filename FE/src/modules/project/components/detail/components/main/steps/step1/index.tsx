import React from "react";
import { ProjectContext } from "@project/components/detail";
import { Infor } from "@project/components/detail"
import { TypeDataSet } from "@project/const";
export default function Step1(): React.JSX.Element {
    const project = React.useContext(ProjectContext)
    return <div className="space-y-4">
        <Infor className="[&__h2]:text-lg" label="Client">
            <p>{project?.client}</p>
        </Infor>
        <Infor className="[&__h2]:text-lg" label="Project type">
            <p>{TypeDataSet.find(el => el.value == project?.type)?.text}</p>
        </Infor>
    </div>
}