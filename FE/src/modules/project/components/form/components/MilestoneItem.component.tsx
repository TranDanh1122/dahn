import React from "react";
import { z } from "zod";
import { milestoneSchema } from "@project/models/request.schema"
import { MilestoneStatus, MilestoneStatusBgColor, MilestoneStatusColor } from "@project/const";
import { X } from "lucide-react";
interface MilestoneItem {
    milestone: z.infer<typeof milestoneSchema>
    handleOpen: () => void
    removeItem: () => void
}
export default React.memo(
    function MilestoneItem(
        {
            milestone,
            handleOpen,
            removeItem
        }: MilestoneItem): React.JSX.Element {

        const [color, bgColor] = React.useMemo(() => {
            const color: string = MilestoneStatusColor[milestone.status]
            const bgColor: string = MilestoneStatusBgColor[milestone.status]
            return [color, bgColor]
        }, [milestone.status])

        return <div onClick={handleOpen}
            className="py-4 border-b border-neutral-200 
            grid grid-cols-5 items-center cursor-pointer
            hover:bg-neutral-100 hover:rounded-lg hover:px-2 hover:shadow">
            <span className="line-clamp-1">{milestone.name}</span>
            <span className="text-center">{milestone.duration}</span>
            <span className="text-center">{milestone.process}</span>
            <div className={`${color} justify-end flex items-center gap-2 w-full`}>
                {
                    MilestoneStatus.find(el =>
                        el.value == milestone.status
                    )?.text
                }
                <div className={`size-2 rounded-full ${bgColor}`}></div>
            </div>
            <X onClick={
                (e: React.MouseEvent) => {
                    e.stopPropagation()
                    removeItem();
                }
            }
                className="text-neutral-600 font-light hover:text-red-500 cursor-pointer mx-auto"
            />
        </div>
    })