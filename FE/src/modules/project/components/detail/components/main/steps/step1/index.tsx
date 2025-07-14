import React from "react";
import { Infor } from "@project/components/detail"
import { TypeDataSet } from "@project/const";
import Text from "@components/Text.component";
import { useSelector } from "react-redux";
import type { AppState } from "@/stores";
export default function Step1(): React.JSX.Element {
    const project = useSelector((state: AppState) => state.project.project);
    const type = React.useMemo(() => {
        return TypeDataSet.find(el => el.value == project?.type)?.text
    }, [project?.type])
    const techstack = React.useMemo(() => {
        if (!project || !project.techstack) return ""
        return project.techstack.split(",").map((el) => (
            <span key={el}
                className="w-fit cursor-pointer contain-content will-change-transform
                                px-3 py-1 bg-slate-100 hover:-translate-y-1
                                transition-transform duration-100 ease-in
                                rounded-full text-slate-700">
                {el}
            </span>
        ))
    }, [project])
    return <div className="flex flex-col gap-10 justify-center h-full text-sm">
        <Infor label="Project type: ">
            <p >{type}</p>
        </Infor>
        <Infor label="Client: ">
            <p >{project?.client}</p>
        </Infor>
        <Infor className=" flex-col items-start! gap-6" label="Description: ">
            <Text lineClamp="line-clamp-5" className="leading-8 tracking-wide text-slate-700 text-justify">
                {project?.description}
            </Text>
        </Infor>

        <Infor className=" flex-col items-start! gap-6" label="Project Teckstacks: ">
            <div className="flex flex-wrap gap-3">
                {techstack}
            </div>
        </Infor>
    </div >
}