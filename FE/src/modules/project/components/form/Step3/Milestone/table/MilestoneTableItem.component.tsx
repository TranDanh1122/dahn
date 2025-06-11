import React from "react";
import { MilestoneStatus, MilestoneStatusBgColor, MilestoneStatusColor } from "@project/const";
import type { TableItemProps } from "@components/ArrayForm";
import type { z } from "zod";
import type { milestoneSchema } from "@project/models/request.schema";
interface MilestoneItem extends TableItemProps {
    data?: z.infer<typeof milestoneSchema>
}
export default function MilestoneItem({ data }: MilestoneItem): React.JSX.Element {

    const [color, bgColor] = React.useMemo(() => {
        if (!data) return ["", ""];
        const color: string = MilestoneStatusColor[data.status];
        const bgColor: string = MilestoneStatusBgColor[data.status];
        return [color, bgColor];
    }, [data?.status]);

    if (!data) return <></>;

    return <>
        <span className="line-clamp-1">{data.name}</span>
        <span className="text-center">{data.duration}</span>
        <span className="text-center">{data.process}</span>
        <div className={`${color} justify-end flex items-center gap-2 w-full`}>
            {
                MilestoneStatus.find(el =>
                    el.value == data.status
                )?.text
            }
            <div className={`size-2 rounded-full ${bgColor}`}></div>
        </div>

    </>
}