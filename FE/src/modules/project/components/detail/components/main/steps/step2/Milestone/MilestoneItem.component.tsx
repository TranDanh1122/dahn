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

export default React.memo(function MileStoneItem({ milestone, openModal }: { milestone: MilestoneData, openModal: (e: React.MouseEvent) => void }): React.JSX.Element {
    const [color, bgColor, status, hex] = React.useMemo(() => {
        const color = MilestoneStatusColor[milestone.status] || "";
        const bgColor = MilestoneStatusBgColor[milestone.status] || "";
        const status = MilestoneStatus.find((el) => el.value == milestone.status)?.text;
        const hex = MilestoneStatusHex[milestone.status] || "";
        return [color, bgColor, status, hex]
    }, [milestone.status])

    return (
        <div className="grid grid-cols-4">
            <Infor>{milestone.name}</Infor>
            <Infor>{milestone.duration}</Infor>
            <Infor>
                <div className="size-10 rounded-full relative" title={`${milestone.process}%`}
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
            <Infor onClick={(e) => openModal(e)}>
                <Badge color={color} bgColor={bgColor} title={status}>
                    {status}
                </Badge>
            </Infor>
        </div>
    );
});
