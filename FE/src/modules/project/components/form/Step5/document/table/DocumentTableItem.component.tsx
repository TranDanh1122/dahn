import React from "react"
import CircleLogoWText from "@components/CircleLogoWText.component"
import type { TableItemProps } from "@components/ArrayForm"
import { z } from "zod"
import type { documentSchema } from "@project/models/request.schema"
import { DocumentStatus } from "@project/const"
import Copy from "lucide-react/dist/esm/icons/copy"
import { copy } from '@/common/ults/Tool'

interface DocumentTableItemProps extends TableItemProps {
    data?: z.infer<typeof documentSchema>
}
export default function DocumentTableItem({ data }: DocumentTableItemProps): React.JSX.Element {
    const status = React.useMemo(() => {
        if (!data) return { value: "", text: "" }
        return DocumentStatus.find(el => el.value == data.status)
    }, [data?.status])

    const handleCopy = React.useCallback(async (e: React.MouseEvent, text: string) => {
        e.preventDefault();
        e.stopPropagation();
        await copy(text)
    }, [])
    if (!data) return <></>

    return <>

        <span
            className="text-center line-clamp-1"
            title={data.name}>
            {data.name}
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
            <CircleLogoWText
                img={data.user.avatar_url}
                text={data.user.full_name || data.user.email}>
            </CircleLogoWText>
        </span>
        <span
            className="text-center line-clamp-1"
            title={status?.text}>
            {status?.text}
        </span>

    </>
}