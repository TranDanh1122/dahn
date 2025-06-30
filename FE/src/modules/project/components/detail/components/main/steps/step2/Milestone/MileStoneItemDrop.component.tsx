import type { MilestoneData } from "@project/models/request.schema";
import { Infor } from "@project/components/detail";
import React from "react";
import Text from "@components/Text.component";
export default function MilestoneItemDropContent({ milestone }: { milestone: MilestoneData }): React.JSX.Element {
    return <div className="flex flex-col gap-3" >
        <Infor label="Description:" className="flex flex-col items-start">
            <Text lineClamp="line-clamp-4" >
                {milestone.description}
            </Text>
        </Infor>
        <div className="flex items-center justify-between">
            <Infor label="Start Date:">
                <p>{new Date(milestone.startDate).toDateString()}</p>
            </Infor>
            <Infor label="End Date:">
                <p>{new Date(milestone.endDate).toDateString()}</p>
            </Infor>
        </div>

    </div>
}