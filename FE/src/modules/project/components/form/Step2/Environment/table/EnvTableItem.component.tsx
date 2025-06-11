import type { envSchema } from '@project/models/request.schema'
import type { TableItemProps } from '@components/ArrayForm'
import React from 'react'
import type { z } from 'zod'
import Copy from "lucide-react/dist/esm/icons/copy"
import { copy } from '@/common/ults/Tool'

interface EnvItemProps extends TableItemProps {
    data?: z.infer<typeof envSchema>
}
export default function EnvTableItem({ data }: EnvItemProps): React.JSX.Element {

    const handleCopy = React.useCallback(async (e: React.MouseEvent, text: string) => {
        e.preventDefault();
        e.stopPropagation();
        await copy(text)
    }, [])
    if (!data) return <></>
    return <>
        <span className="line-clamp-1 text-left">{data.name}</span>
        <div className="flex items-center justify-center gap-1">
            <a target="_blank"
                onClick={(e) => { e.stopPropagation() }}
                href={data.demoUrl}
                className="text-center line-clamp-1">
                {data.demoUrl}
            </a>
            <Copy
                className="size-3.5 shrink-0"
                onClick={(e) => handleCopy(e, data.demoUrl)}
            />
        </div>

        <span className="text-center">{data.status}</span>
        <div className="flex items-center justify-center gap-1">
            <a target="_blank"
                onClick={(e) => { e.stopPropagation() }}
                href={data.readme}
                className="text-center line-clamp-1">
                {data.readme}
            </a>
            <Copy
                className='size-3.5 shrink-0'
                onClick={(e) => handleCopy(e, data.readme)}
            />
        </div>
    </>
}