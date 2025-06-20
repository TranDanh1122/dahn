import type { Project } from "@project/models";
import React from "react";
export const ProjectContext = React.createContext<Project | undefined>(undefined)
export const StepContext = React.createContext<{
    step: number,
    setStep?: React.Dispatch<React.SetStateAction<number>>
}>({ step: 1 })
interface DetailProjectContextProviderProps {
    children: React.ReactNode,
    project: Project
}
export default function DetailProjectContextProvider({ children, project }: DetailProjectContextProviderProps): React.JSX.Element {
    const [step, setStep] = React.useState(1)
    return <ProjectContext.Provider value={project}>
        <StepContext.Provider value={{ step, setStep }}>
            {children}
        </StepContext.Provider>
    </ProjectContext.Provider>
}