import { Infor } from "@project/components/detail";
import type { DocumentData } from "@project/models";
import React from "react";
import Copy from "lucide-react/dist/esm/icons/copy";
import { copy } from "@/common/ults/Tool";
import Text from "@components/Text.component"
export default function DocumentItemDropDownContent({ document }: { document: DocumentData }): React.JSX.Element {
    return (
        <div className="space-y-3">
            <Infor className="flex flex-col items-start" label="Note: ">
                <Text lineClamp="line-clamp-4" >
                    {document.note}
                </Text>

            </Infor>
            <Infor label="Full link:" className="[&__h2]:w-fit ">
                <Text lineClamp="line-clamp-1">{document.link}</Text>
                <Copy
                    onClick={() => copy(document.link)}
                    className="size-3.5 shrink-0 cursor-pointer"
                />
            </Infor>
        </div>
    );
}
