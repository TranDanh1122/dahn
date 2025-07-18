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
import SquarePen from "lucide-react/dist/esm/icons/square-pen";
import X from "lucide-react/dist/esm/icons/x"
import type { AppDispatch, AppState } from "@/stores";
import { useDispatch, useSelector } from "react-redux";
import { deleteMilestoneThunk } from "@project/store/action/deleteMilestone.action";

export default React.memo(function MileStoneItem({ milestone, openModal }: { milestone: MilestoneData, openModal: (e: React.MouseEvent) => void }): React.JSX.Element {
    const [color, bgColor, status, hex] = React.useMemo(() => {
        const color = MilestoneStatusColor[milestone.status] || "";
        const bgColor = MilestoneStatusBgColor[milestone.status] || "";
        const status = MilestoneStatus.find((el) => el.value == milestone.status)?.text;
        const hex = MilestoneStatusHex[milestone.status] || "";
        return [color, bgColor, status, hex]
    }, [milestone.status])
    const dispatch: AppDispatch = useDispatch()
    const project = useSelector((state: AppState) => state.project.project)
    const deleteMilestone = React.useCallback((e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(deleteMilestoneThunk({ projectId: project?.id || "", milestoneId: milestone?.id || "", fallback: project })).unwrap()
            .then(() => console.log("Deleted OK"))
            .catch((err) => console.error("Delete failed", err));
    }, [project, milestone, dispatch])
    return (
        <div className="grid grid-cols-5 items-center group">
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
            <Infor>
                <Badge color={color} bgColor={bgColor} title={status}>
                    {status}
                </Badge>
            </Infor>
            <div className="flex items-center justify-start gap-3">
                <SquarePen onClick={(e) => openModal(e)} className="size-5 text-slate-500 cursor-pointer items-center hover-show" />
                <X onClick={(e) => deleteMilestone(e)} className="size-5 text-slate-700 hover-show cursor-pointer" />
            </div>
        </div>
    );
});
