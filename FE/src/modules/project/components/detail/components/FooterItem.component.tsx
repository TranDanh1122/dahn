import React from "react";
import {
    EnvironmentColor,
    EnvironmentBgColor,
    EnvironmentStatus,
} from "@project/const";
import SquareArrowOutUpRight from "lucide-react/dist/esm/icons/square-arrow-out-up-right";
import type { EnvData } from "@project/models";
import Badge from "@components/Badge.component";
import Text from "@components/Text.component"
import type { TableItemProps } from "@/components/ArrayForm";
import X from "lucide-react/dist/esm/icons/x"
import type { AppDispatch, AppState } from "@/stores";
import { useDispatch, useSelector } from "react-redux";
import { deleteEnvThunk } from "@project/store/action/deleteEnv.action";


interface FooterItemProps extends TableItemProps {
    data?: EnvData,
    clicked?: () => void
}
export default React.memo(function FooterItem({ data, clicked }: FooterItemProps): React.JSX.Element {
    const [color, bgColor, status] = React.useMemo(() => {
        if (!data) return ["", "", ""]
        const status = EnvironmentStatus.find((el) => el.value == data.status)?.text || ""
        const color = EnvironmentColor[data.status] || ""
        const bgColor = EnvironmentBgColor[data.status] || ""
        return [color, bgColor, status]
    }, [data])
    const dispatch: AppDispatch = useDispatch()
    const project = useSelector((state: AppState) => state.project.project)
    const handleDelete = React.useCallback((e: React.MouseEvent) => {
        e.stopPropagation()
        dispatch(deleteEnvThunk({ projectId: project?.id || "", envId: data?.id || "", fallbackData: project }))
    }, [project])
    if (!data) return <></>
    return (
        <div onClick={() => clicked?.()} className="border border-slate-200 overflow-auto scrollbar-thin w-1/4
            shadow-slate-100 shadow group hover:shadow-lg hover:shadow-slate-300
            rounded-2xl h-full p-4 flex flex-col justify-between gap-2">
            <div className="flex justify-between">
                <div className="flex items-center gap-2">
                    <h2 className="text-slate-600 text-sm font-semibold uppercase line-clamp-1">
                        {data.name}
                    </h2>
                    <Badge color={color} bgColor={bgColor} >
                        {status}
                    </Badge>
                </div>
                <X onClick={handleDelete} className="size-5 text-slate-700 hover-show cursor-pointer" />
            </div>

            <Text lineClamp="line-clamp-4" className="text-slate-500 text-xs tracking-wider">
                {data.note}
            </Text>
            <div className="flex justify-between">
                <a
                    href={data.readme}
                    title={data.readme}
                    className="flex items-center gap-2 text-xs">
                    <span>Readme</span>
                    <SquareArrowOutUpRight className="  size-4 text-slate-800 hover-show" />
                </a>
                <a
                    href={data.demoUrl}
                    title={data.demoUrl}
                    className="flex items-center gap-2 text-xs">
                    <span>Demo</span>
                    <SquareArrowOutUpRight className=" size-4 text-slate-800 hover-show" />
                </a>
            </div>
        </div>
    );
});
