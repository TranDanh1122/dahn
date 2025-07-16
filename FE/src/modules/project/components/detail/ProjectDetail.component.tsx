import React from "react";
import Overview from "./components/side"
import MainDetail from "./components/main";
import { BreadscrumContext } from "@/context/Breadscrum.context";
import SkeletonComponent from "@/components/Skeleton.component";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, AppState } from "@/stores";
import { API_ENDPOINT } from "@/common/ults/ApiEndpoint.const";
import { setProject } from "@project/store";
import { ErrorHandler } from "@/common/ults/NotifyHandler";
const Footer = React.lazy(() => import("./components/footer"))
export default function DetailProject(): React.JSX.Element {
    const project = useSelector((state: AppState) => state.project.project);
    const dispatch: AppDispatch = useDispatch()
    const skeletonFooter = React.useMemo(() => {
        return (
            <div className="flex gap-2 h-full">
                {
                    Array.from({ length: 4 }).map((_, idx) => <SkeletonComponent key={idx} className="bg-slate-100 w-1/4 h-full rounded-2xl" />)
                }
            </div>
        )
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
    }, [project])

    React.useEffect(() => {

        const updatedSSE = new EventSource(`${API_ENDPOINT.project}/sse`, { withCredentials: true })

        updatedSSE.onmessage = function (e) {
            const data = JSON.parse(e.data)
            dispatch(setProject(data))
        }

        updatedSSE.onerror = () => {
            ErrorHandler("Maybe you are offline, some data will missing....")
        }

        return () => updatedSSE.close()
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
            <div className=" h-44 relative">
                <React.Suspense fallback={skeletonFooter}>
                    <Footer />
                </React.Suspense>
            </div>
        </div>
    )

}