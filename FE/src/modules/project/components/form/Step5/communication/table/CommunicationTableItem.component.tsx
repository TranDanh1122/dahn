import React from "react";
import Copy from "lucide-react/dist/esm/icons/copy"
import { copy } from '@/common/ults/Tool'
import type { TableItemProps } from "@/components/ArrayForm";
import { z } from "zod";
import { communitationSchema } from "@project/models/request.schema";
import { CommunitationMeeting } from "@project/const";
interface CommunicationTableItemProps extends TableItemProps {
    data?: z.infer<typeof communitationSchema>
}
export default function CommunicationTableItem({ data }: CommunicationTableItemProps): React.JSX.Element {
    const handleCopy = React.useCallback(async (e: React.MouseEvent, text: string) => {
        e.preventDefault();
        e.stopPropagation();
        await copy(text)
    }, [])

    const meeting = React.useMemo(() => {
        if (!data) return ""
        if (data.meeting == "custom") return data.meetingCustom
        return CommunitationMeeting.find(el => data.meeting == el.value)?.value
    }, [data])

    if (!data) return <></>
    return <>
        <span
            className="text-center line-clamp-1"
            title={data.channel}>
            {data.channel}
        </span>
        <div className="flex items-center justify-center gap-1">
            <a target="_blank"
                onClick={(e) => { e.stopPropagation() }}
                href={data.link}
                className="text-center line-clamp-1">
                {data.link}
            </a>
            <Copy
                className="size-3.5 shrink-0"
                onClick={(e) => handleCopy(e, data.link)}
            />
        </div>
        <span className="text-left">
            {meeting}
        </span>
        <span
            className="text-center line-clamp-1"
            title={data.schedule}>
            {data.schedule}
        </span>

    </>
}