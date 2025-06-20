import React from "react";
import {
    EnvironmentColor,
    EnvironmentBgColor,
    EnvironmentStatus,
} from "@project/const";
import SquareArrowOutUpRight from "lucide-react/dist/esm/icons/square-arrow-out-up-right";
import type { EnvData } from "@project/models";
export default React.memo(function FooterItem({ env }: { env: EnvData }): React.JSX.Element {
    const color = React.useMemo(() => EnvironmentColor[env.status] || "", [env.status]);
    const bgColor = React.useMemo(() => EnvironmentBgColor[env.status] || "", [env.status]);
    return (
        <div className="border border-slate-200 
            shadow-slate-100 shadow 
            rounded-2xl shrink-0 
            w-1/4 h-full p-4 space-y-2">
            <div className="flex items-center gap-2">
                <h2 className="text-slate-600 font-semibold uppercase line-clamp-1">
                    {env.name}
                </h2>
                <span className={`text-sm ${color} ${bgColor} 
                                rounded-full px-2 py-0.5
                                border-2 border-${color}`}>
                    {EnvironmentStatus.find((el) => el.value == env.status)?.text || ""}
                </span>
            </div>
            <p className="line-clamp-3 text-slate-500">
                {env.note}
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto, nobis
                optio, odit tempora animi ratione explicabo sint obcaecati ducimus,
                dicta et nemo voluptates earum excepturi ut impedit cupiditate eum ex.
            </p>
            <div className="flex justify-between">
                <a
                    href={env.readme}
                    title={env.readme}
                    className="flex items-center gap-2">
                    <span>Readme</span>
                    <SquareArrowOutUpRight className=" right-0 top-0 size-4 text-slate-800" />
                </a>
                <a
                    href={env.demoUrl}
                    title={env.demoUrl}
                    className="flex items-center gap-2">
                    <span>Demo</span>
                    <SquareArrowOutUpRight className=" right-0 top-0 size-4 text-slate-800" />
                </a>
            </div>
        </div>
    );
});
