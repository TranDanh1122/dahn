import { Infor } from "@project/components/detail";
import type { MemberData } from "@project/models";
import React from "react";
import Text from "@components/Text.component"
export default React.memo(function MemberItem({ member }: { member: MemberData }): React.JSX.Element {
    return (
        <div className="border border-slate-200 rounded-xl tracking-wide space-y-2 p-4 contain-content hover:shadow-lg shadow-slate-200 ">
            <img
                className="size-15 object-cover rounded-full border border-slate-300 mx-auto"
                src={member.user?.avatar_url || ''}
                alt={member.user?.full_name || member.user?.email}
            />
            <h3 className="text-center text-sm! font-bold line-clamp-1">{member.user?.full_name || member.user?.email}</h3>
            <Infor label="Role:" className="[&__h2]:w-max [&__h2]:text-xs">
                <span className="text-xs">{member.role?.name}</span>
            </Infor>
            <Infor label="Note:" className="[&__h2]:w-max [&__h2]:text-xs flex-col gap-1! items-start ">
                <Text lineClamp="line-clamp-3" className="text-slate-600 text-xs">
                    {member.note}
                </Text>
            </Infor>
            <div className="flex items-center">
                <Infor label="Rate:" className="[&__h2]:w-max [&__h2]:text-xs">
                    <h4 className="text-xs line-clamp-1">{member.hourlyRate}</h4>
                </Infor>
                <Infor label="Total Hours:" className="[&__h2]:w-max [&__h2]:text-xs">
                    <h4 className="text-xs line-clamp-1">
                        {member.hours}
                    </h4>
                </Infor>
            </div>
        </div>
    )
})