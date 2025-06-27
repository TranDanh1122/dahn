import React from "react";
import Overview from "./components/side"
import MainDetail from "./components/main";
import { ProjectContext } from "./context/Detail.context";
import FooterItemComponent from "./components/FooterItem.component";
import { BreadscrumContext } from "@/context/Breadscrum.context";
export default function DetailProject(): React.JSX.Element {
    const project = React.useContext(ProjectContext);
    const footer = React.useMemo(() => {
        return project?.environment?.map((env) => <FooterItemComponent key={env.id} env={env} />)
    }, [project?.environment])
    const { setBreadscrum } = React.useContext(BreadscrumContext)
    React.useEffect(() => {
        if (project)
            setBreadscrum([
                {
                    link: "/",
                    text: "Dashboard"
                },
                {
                    link: `/workspace/${project.workspaceID}`,
                    text: "Projects"
                },
                {
                    link: `/project/${project.id}`,
                    text: `${project.name}`
                }
            ])
    }, [])
    return (
        <div className="p-4 h-full">
            <div className="flex gap-15 h-[calc(100%-11rem)]">
                <div className="w-5/7 h-full overflow-y-auto scrollbar-thin">
                    <MainDetail />
                </div>
                <div className="w-2/7 shrink-0 space-y-5 overflow-y-auto scrollbar-thin pb-4">
                    <Overview />
                </div>
            </div>
            <div className="flex items-center justify-evenly h-44">
                {footer}
            </div>
        </div>
    )

}