import React from "react";
import {
    DropdownInfo,
    ProjectContext,
} from "@project/components/detail";
import MilestoneItem from "./components/MilestoneItem.component";
const MilestoneDropContent = React.lazy(() => import("./components/MileStoneItemDrop.component"))
export default function Step2(): React.JSX.Element {
    const project = React.useContext(ProjectContext);
    return (
        <div className="flex flex-col gap-6 justify-center text-sm h-full min-h-max py-4">
            {project &&
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
    );
}
