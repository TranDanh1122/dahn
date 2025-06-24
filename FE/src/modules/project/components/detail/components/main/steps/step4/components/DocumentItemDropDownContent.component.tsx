import { Infor } from "@project/components/detail";
import type { DocumentData } from "@project/models/request.schema";
import React from "react";
import Copy from "lucide-react/dist/esm/icons/copy";
import { copy } from "@/common/ults/Tool";
export default function DocumentItemDropDownContent({ document }: { document: DocumentData }): React.JSX.Element {
    return (
        <div className="space-y-3">
            <Infor className="flex flex-col items-start" label="Note: ">
                {document.note}
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit sapiente
                quas, reprehenderit recusandae illum corporis obcaecati consectetur
                quae, deleniti alias doloribus nulla saepe praesentium ut cum laboriosam
                eum dolorem nobis.
            </Infor>
            <Infor label="Full link:" className="[&__h2]:w-fit ">
                <p className="line-clamp-2">{document.link}</p>
                <Copy
                    onClick={() => copy(document.link)}
                    className="size-3.5 shrink-0 cursor-pointer"
                />
            </Infor>
        </div>
    );
}
