import CircleLogoWText from "@components/CircleLogoWText.component"
import type { TableItemProps } from "@components/ArrayForm"
import { memberSchema } from "@project/models/request.schema"
import React from "react"
import type { z } from "zod"
interface MemberItemProps extends TableItemProps {
    data?: z.infer<typeof memberSchema>
}
export default function MemberTableItem({ data }: MemberItemProps): React.JSX.Element {
    if (!data) return <></>
    return <>
        <span className="text-left">
            <CircleLogoWText
                img={data.user.avatar_url}
                text={data.user.full_name || data.user.email}>
            </CircleLogoWText>
        </span>
        <span
            className="text-center line-clamp-1"
            title={data.role}>
            {data.role}
        </span>
        <span
            className="text-center line-clamp-1"
            title={String(data.hourlyRate)}>
            {data.hourlyRate}
        </span>
        <span
            className="text-center line-clamp-1"
            title={String(data.hours)}>
            {data.hours}
        </span>
    </>
}