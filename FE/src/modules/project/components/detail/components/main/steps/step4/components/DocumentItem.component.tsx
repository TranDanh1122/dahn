import type { DocumentData } from "@project/models/request.schema";
import { Infor, MoreInfo } from "@project/components/detail";
import React from "react";
import SquareArrowOutUpRight from "lucide-react/dist/esm/icons/square-arrow-out-up-right"

export default React.memo(function DocumentItem({ document }: { document: DocumentData }): React.JSX.Element {

    return (
        <div className="grid grid-cols-4 group ">
            <Infor>{document.name}</Infor>
            <Infor>{document.status}</Infor>
            <Infor>
                <MoreInfo
                    label="Owner: "
                    text={document?.user?.full_name || document.user?.email || ""}
                    image={document?.user?.avatar_url || ""}
                />
            </Infor>
            <Infor>
                <a className="mx-auto" href={document.link} target="_blank" title={document.name}>
                    <SquareArrowOutUpRight className="size-4 text-slate-600 hover-show" />
                </a>
            </Infor>
        </div>
    );
})