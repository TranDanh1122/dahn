import React from "react";
import {
    EnvironmentColor,
    EnvironmentBgColor,
    EnvironmentStatus,
} from "@project/const";
import SquareArrowOutUpRight from "lucide-react/dist/esm/icons/square-arrow-out-up-right";
import type { EnvData } from "@project/models";
import Badge from "@/components/Badge.component";
export default React.memo(function FooterItem({ env }: { env: EnvData }): React.JSX.Element {
    const [color, bgColor, status] = React.useMemo(() => {
        const status = EnvironmentStatus.find((el) => el.value == env.status)?.text || ""
        const color = EnvironmentColor[env.status] || ""
        const bgColor = EnvironmentBgColor[env.status] || ""
        return [color, bgColor, status]
    }, [env.status])
    return (
        <div className="border border-slate-200 
            shadow-slate-100 shadow group hover:shadow-lg hover:shadow-slate-300
            rounded-2xl w-1/4 h-max p-4 space-y-2">
            <div className="flex items-center gap-2">
                <h2 className="text-slate-600 text-sm font-semibold uppercase line-clamp-1">
                    {env.name}
                </h2>
                <Badge color={color} bgColor={bgColor} >
                    {status}
                </Badge>
            </div>
            <p className="line-clamp-3 text-slate-500 text-sm">
                {env.note}
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto, nobis
                optio, odit tempora animi ratione explicabo sint obcaecati ducimus,
                dicta et nemo voluptates earum excepturi ut impedit cupiditate eum ex.
            </p>
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
