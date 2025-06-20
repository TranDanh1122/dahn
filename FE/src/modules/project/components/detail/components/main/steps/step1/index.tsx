import React from "react";
import { ProjectContext } from "@project/components/detail";
import { Infor } from "@project/components/detail"
import { TypeDataSet } from "@project/const";
import { v4 } from "uuid";
export default function Step1(): React.JSX.Element {
    const project = React.useContext(ProjectContext)
    return <div className="flex flex-col gap-10 justify-center h-full text-sm">
        <Infor label="Project type: ">
            <p >{TypeDataSet.find(el => el.value == project?.type)?.text}</p>
        </Infor>
        <Infor label="Client: ">
            <p >{project?.client}</p>
        </Infor>
        <Infor className=" flex-col items-start! gap-6" label="Description: ">
            <p className="leading-8 tracking-wide text-slate-700 line-clamp-5">
                {project?.description}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est excepturi officiis a consectetur ut consequuntur ullam qui molestiae architecto iste. Excepturi culpa similique laborum, delectus sapiente nisi reprehenderit consectetur omnis?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non facere nam sapiente ea ut harum tempora fugiat animi voluptatum, blanditiis quam explicabo eligendi quia mollitia nostrum, enim quae modi maiores.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore rerum dolorum natus expedita cumque at dignissimos? Mollitia, quis exercitationem a debitis praesentium, amet nesciunt pariatur sapiente quidem, omnis dignissimos inventore?
            </p>
        </Infor>

        <Infor className=" flex-col items-start! gap-6" label="Project Teckstacks: ">
            <div className="flex flex-wrap gap-3">
                {project?.techstack &&
                    project.techstack.split(",").map((el) => (
                        <span key={v4()}
                            className="w-fit cursor-pointer 
                                px-3 py-1 bg-slate-100
                                rounded-full text-slate-700">
                            {el}
                        </span>
                    ))}
            </div>
        </Infor>
    </div>
}