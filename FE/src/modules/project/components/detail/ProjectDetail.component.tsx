import React from "react";
import Overview from "./components/side"
import MainDetail from "./components/main";
import { ProjectContext } from "./context/Detail.context";
import { BreadscrumContext } from "@/context/Breadscrum.context";
import SkeletonComponent from "@/components/Skeleton.component";
const Footer = React.lazy(() => import("./components/footer"))
export default function DetailProject(): React.JSX.Element {
    const project = React.useContext(ProjectContext);
    const skeletonFooter = React.useMemo(() => {
        return Array.from({ length: 4 }).map((_, idx) => <SkeletonComponent key={idx} className="bg-slate-100 w-1/4 h-full rounded-2xl" />)
    }, [])
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
            <div className="flex items-center justify-evenly gap-2 h-44">
                <React.Suspense fallback={skeletonFooter}>
                    <Footer />
                </React.Suspense>
            </div>
        </div>
    )

}