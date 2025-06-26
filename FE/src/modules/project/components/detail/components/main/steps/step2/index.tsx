import React from "react";
import {
    DropdownInfo,
    ProjectContext,
} from "@project/components/detail";
import MilestoneItem from "./Milestone/MilestoneItem.component";
const MilestoneDropContent = React.lazy(() => import("./Milestone/MileStoneItemDrop.component"))
export default function Step2(): React.JSX.Element {
    const project = React.useContext(ProjectContext);
    return (
        <div className="space-y-4">
            <h2 className="font-medium text-lg">Milestones</h2>
            <div className="flex flex-col gap-6 justify-center text-sm h-full min-h-max py-4">
                <div className="grid grid-cols-4 text-sm font-medium">
                    <span>Name</span>
                    <span>Duration</span>
                    <span>Process</span>
                    <span>Status</span>
                </div>
                {
                    project &&
                    project.milestones &&
                    project.milestones.map(el => (
                        <DropdownInfo
                            key={el.id}
                            itemContent={<MilestoneItem milestone={el} />}
                            dropContent={<MilestoneDropContent milestone={el} />}
                        />
                    ))
                }

            </div >
        </div>
    );
}
