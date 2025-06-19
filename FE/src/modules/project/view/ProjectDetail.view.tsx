import { useLoaderData } from "react-router-dom"
import { useGetProjectQuery } from "../flows/project/project.service"
import React from "react"

export default function ProjectDetail(): React.JSX.Element {
    const { projectId } = useLoaderData()
    const { data: project, isLoading, isError } = useGetProjectQuery(projectId)
    React.useEffect(() => {
        console.log(project)
    }, [project])
    return <></>
}