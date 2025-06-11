import type { TableItemProps } from "@/components/ArrayForm";
import type { roleSchema } from "@project/models/request.schema";
import React from "react";
import type { z } from "zod";

interface RoleTableItem extends TableItemProps {
    data?: z.infer<typeof roleSchema>
}
export default function RoleTableItem({ data }: RoleTableItem): React.JSX.Element {
    if (!data) return <></>
    return <>
        <span className="line-clamp-1">{data.name}</span>
        <span className="text-center">{data.project}</span>
        <span className="text-center">{data.milestone}</span>
        <span className="text-center">{data.status}</span>
    </>
}