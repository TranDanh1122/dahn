import React from "react";
import { MilestoneModal } from "./Milestone";
import { ArrayForm } from "@components/ArrayForm";
import {
    MilestoneTableHead,
    MilestoneTableItem
} from "@project/components/form/Step3/Milestone"
import { milestoneSchema } from "@/modules/project/models/request.schema";
export default function Step3(): React.JSX.Element {
    return <ArrayForm
        name="milestones"
        label="Milestones"
        headerEl={<MilestoneTableHead />}
        itemEl={<MilestoneTableItem />}
        modalFormContent={<MilestoneModal />}
        modelFormSchema={milestoneSchema}
    />
}
