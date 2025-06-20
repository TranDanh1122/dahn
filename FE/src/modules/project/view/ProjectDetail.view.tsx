import { useLoaderData } from "react-router-dom";
import { useGetProjectQuery } from "../flows/project/project.service";
import React from "react";
import LoadingComponent from "@/components/Loading.component";
import { Overview } from "@project/components/detail"
export default function ProjectDetail(): React.JSX.Element {
    const { projectId } = useLoaderData();
    const { data: project, isLoading, isError } = useGetProjectQuery(projectId);
    if (isError) throw new Error("Internal server error");
    return (
        <>
            {isLoading && (
                <LoadingComponent className="border-s-slate-400! size-10" />
            )}
            {!isLoading && (
                <div className="flex flex-col gap-8 p-4 h-full">
                    <div className="flex h-full">
                        <div className="w-5/7">

                        </div>
                        <div className="w-2/7 flex flex-col gap-6 justify-center">
                            <Overview projectName={project?.name} projectOverview={project?.overview} />
                        </div>
                    </div>

                    <div className=" col-span-5 h-52 bg-gray-600">3</div>
                </div>
            )}
        </>
    );
}
