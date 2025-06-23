import type { MilestoneData } from "@project/models/request.schema";
import { Infor } from "@project/components/detail";
import React from "react";
export default function MilestoneItemDropContent({ milestone }: { milestone: MilestoneData }): React.JSX.Element {
    return <div className="flex flex-col gap-3" >
        <Infor label="Description" className="flex flex-col items-start">
            <p className="line-clamp-4">
                {milestone.description}
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Ex, dolor tempore, pariatur veniam corrupti consectetur quia
                cum vitae nam praesentium voluptatum dicta reiciendis iure?
                Magni sapiente tenetur unde dolore velit.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda eum sint,
                deserunt laboriosam maxime molestias saepe nihil et doloremque dolorum?
                Laudantium quae odio vero veritatis, repellendus autem magnam sequi? Assumenda!
            </p>
        </Infor>
        <div className="flex items-center justify-between">
            <Infor label="Start Date">
                <p>{new Date(milestone.startDate).toDateString()}</p>
            </Infor>
            <Infor label="End Date">
                <p>{new Date(milestone.endDate).toDateString()}</p>
            </Infor>
        </div>

    </div>
}