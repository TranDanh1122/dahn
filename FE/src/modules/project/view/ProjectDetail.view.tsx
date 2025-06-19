import { useLoaderData } from "react-router-dom";
import { useGetProjectQuery } from "../flows/project/project.service";
import React from "react";
import LoadingComponent from "@/components/Loading.component";
import SquarePen from "lucide-react/dist/esm/icons/square-pen";
import DetailStep from "@project/components/detail/Step.component"
export default function ProjectDetail(): React.JSX.Element {
    const { projectId } = useLoaderData();
    const { data: project, isLoading, isError } = useGetProjectQuery(projectId);
    if (isError) throw new Error("Internal server error");
    return (
        <>
            {isLoading && (
                <LoadingComponent className="border-s-neutral-400! size-10" />
            )}
            {!isLoading && (
                <div className="flex flex-col gap-8 p-4 h-full">
                    <div className="flex h-full">
                        <div className="w-5/7">

                        </div>
                        <div className="w-2/7 flex flex-col gap-6 justify-center">
                            <h1 className="font-semibold uppercase text-7xl tracking-wide text-slate-600">
                                {project?.name}
                            </h1>
                            <p className="line-clamp-4 leading-6 text-slate-700">
                                {project?.overview}

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
                                <DetailStep active>
                                    <span className="text-slate-500 font-light">01</span>
                                    Overview
                                </DetailStep>
                                <DetailStep>
                                    <span className="text-slate-500 font-light">02</span>
                                    Technical
                                </DetailStep>
                                <DetailStep>
                                    <span className="text-slate-500 font-light">03</span>
                                    Milestones
                                </DetailStep>
                                <DetailStep>
                                    <span className="text-slate-500 font-light">04</span>
                                    Roles & Members
                                </DetailStep>
                                <DetailStep>
                                    <span className="text-slate-500 font-light">05</span>
                                    Documents & More Infomation
                                </DetailStep>
                            </div>
                        </div>
                    </div>

                    <div className=" col-span-5 h-52 bg-gray-600">3</div>
                </div>
            )}
        </>
    );
}
