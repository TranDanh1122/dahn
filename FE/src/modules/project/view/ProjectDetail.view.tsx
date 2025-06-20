import { useLoaderData } from "react-router-dom";
import { useGetProjectQuery } from "../flows/project/project.service";
import React from "react";
import LoadingComponent from "@/components/Loading.component";
import { ProjectDetail } from "@project/components/detail"
export default function ProjectDetailView(): React.JSX.Element {
    const { projectId } = useLoaderData();
    const { data: project, isLoading, isError } = useGetProjectQuery(projectId);
    if (isError) throw new Error("Internal server error");
    return (
        <>
            {isLoading && (
                <LoadingComponent className="border-s-slate-400! size-10" />
            )}
            {!isLoading && project && <ProjectDetail project={project} />}
        </>
    );
}
