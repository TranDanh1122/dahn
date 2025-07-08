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
interface FooterItemProps extends React.ComponentProps<"div"> {
    env?: EnvData
}
export default React.memo(function FooterItem({ env, ...props }: FooterItemProps): React.JSX.Element {

    const [color, bgColor, status] = React.useMemo(() => {
        if (!env) return ["", "", ""]
        const status = EnvironmentStatus.find((el) => el.value == env.status)?.text || ""
        const color = EnvironmentColor[env.status] || ""
        const bgColor = EnvironmentBgColor[env.status] || ""
        return [color, bgColor, status]
    }, [env])

    if (!env) return <></>
    return (
        <div {...props} className="border border-slate-200 overflow-auto scrollbar-thin
            shadow-slate-100 shadow group hover:shadow-lg hover:shadow-slate-300
            rounded-2xl w-1/4 h-full p-4 flex flex-col justify-between gap-2">
            <div className="flex items-center gap-2">
                <h2 className="text-slate-600 text-sm font-semibold uppercase line-clamp-1">
                    {env.name}
                </h2>
                <Badge color={color} bgColor={bgColor} >
                    {status}
                </Badge>
            </div>
            <Text lineClamp="line-clamp-4" className="text-slate-500 text-xs tracking-wider">
                {env.note}
            </Text>
            <div className="flex justify-between">
                <a
                    href={env.readme}
                    title={env.readme}
                    className="flex items-center gap-2 text-xs">
                    <span>Readme</span>
                    <SquareArrowOutUpRight className="  size-4 text-slate-800 hover-show" />
                </a>
                <a
                    href={env.demoUrl}
                    title={env.demoUrl}
                    className="flex items-center gap-2 text-xs">
                    <span>Demo</span>
                    <SquareArrowOutUpRight className=" size-4 text-slate-800 hover-show" />
                </a>
            </div>
        </div>
    );
});
