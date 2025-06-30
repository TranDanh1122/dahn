import type { CommunitationData } from "@project/models/request.schema";
import React from "react";
import SquareArrowOutUpRight from "lucide-react/dist/esm/icons/square-arrow-out-up-right";
import { Infor } from "@project/components/detail";
import { CommunitationMeeting } from "@project/const"
import Text from "@components/Text.component"
export default React.memo(function MeetingItem({ meeting }: { meeting: CommunitationData }): React.JSX.Element {
    const meetingFreq = React.useMemo(() => {
        return CommunitationMeeting.find(el => el.value == meeting.meeting)?.text
    }, [meeting.meeting])
    return (
        <div
            className="border border-slate-200 
            shadow-slate-100 shadow group hover:shadow-lg hover:shadow-slate-300
            rounded-2xl w-1/4 h-max p-4 space-y-2">

            <a
                target="_blank"
                href={meeting.link}
                title={meeting.link}
                className="flex items-center gap-2 w-full text-slate-600 text-sm font-semibold uppercase line-clamp-1">
                {meeting.channel}
                <SquareArrowOutUpRight className="size-4 text-slate-800 ml-auto hover-show" />
            </a>

            <Text lineClamp="line-clamp-2" className="line-clamp-2 text-slate-500 text-sm">
                {meeting.note}
            </Text>
            <div className="space-y-2">

                {meeting.meeting != "no" && (
                    <Infor label="Meeting" className="[&__h2]:text-xs justify-between">
                        <span className="text-xs">
                            {
                                meeting.meeting == "custom"
                                    ? meeting.meetingCustom
                                    : meetingFreq
                            }
                            -
                            {meeting.schedule}
                        </span>

                    </Infor>
                )}

            </div>
        </div>
    );
});
