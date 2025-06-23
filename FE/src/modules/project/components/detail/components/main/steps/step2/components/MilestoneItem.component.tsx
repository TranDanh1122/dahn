import {
    MilestoneStatusColor,
    MilestoneStatusBgColor,
    MilestoneStatus,
    MilestoneStatusHex,
} from "@project/const";
import { Infor } from "@project/components/detail";
import type { MilestoneData } from "@project/models/request.schema";
import React from "react";
import Badge from "@/components/Badge.component";

export default React.memo(function MileStoneItem({ milestone }: { milestone: MilestoneData }): React.JSX.Element {
    const color = React.useMemo(() => {
        return MilestoneStatusColor[milestone.status] || "";
    }, [milestone.status]);
    const bgColor = React.useMemo(() => {
        return MilestoneStatusBgColor[milestone.status] || "";
    }, [milestone.status]);
    const status = React.useMemo(() => {
        return MilestoneStatus.find((el) => el.value == milestone.status)?.text;
    }, [milestone.status]);
    const hex = React.useMemo(() => {
        return MilestoneStatusHex[milestone.status] || "";
    }, [milestone.status]);
    return (
        <div className="grid grid-cols-4">
            <Infor>{milestone.name}</Infor>
            <Infor>{milestone.duration}</Infor>
            <Infor>
                <div className="size-10 rounded-full relative"
                    style={{
                        background: `conic-gradient(${hex} 0% ${milestone.process}%, #e2e8f0 ${milestone.process}% 100%)`,
                    }}>
                    <div className="absolute size-8 inset-1 rounded-full
                                bg-slate-100 text-slate-700  
                                flex items-center justify-center text-[10px]">
                        {milestone.process}%
                    </div>
                </div>
            </Infor>
            <Infor>
                <Badge color={color} bgColor={bgColor}>
                    {status}
                </Badge>
            </Infor>
        </div>
    );
});
