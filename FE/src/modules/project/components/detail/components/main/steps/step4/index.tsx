import React from "react";
import {
    DropdownInfo
} from "@project/components/detail";
import DocumentItemComponent from "./Document/DocumentItem.component"
import DocumentItemDropDownContent from "./Document/DocumentItemDropDownContent.component"
import MeetingItemComponent from "./Meeting/MeetingItem.component";
import { useSelector } from "react-redux";
import type { AppState } from "@/stores";
export default function Step4(): React.JSX.Element {
    const { project } = useSelector((state: AppState) => state.project);
    return <div className="space-y-10">
        <div className="space-y-3">
            <h2 className="font-medium text-lg">Meetings</h2>
            <div className="flex items-center justify-evenly">

                {
                    project &&
                    project.communitation &&
                    project.communitation.map(el => <MeetingItemComponent meeting={el} />)
                }
            </div>
        </div>
        <div className="space-y-3">
            <h2 className="font-medium text-lg">Documents</h2>
            <div className="flex flex-col gap-4 justify-center text-sm h-full min-h-max py-4">
                {
                    project &&
                    project.document &&
                    project.document.map(el => (
                        <DropdownInfo
                            key={el.id}
                            itemContent={<DocumentItemComponent document={el} />}
                            dropContent={<DocumentItemDropDownContent document={el} />}
                        />
                    ))
                }

            </div >
        </div>

    </div>
}