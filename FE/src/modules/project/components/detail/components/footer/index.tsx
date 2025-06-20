import React from "react";
import { ProjectContext } from "@project/components/detail";
import FooterItem from "./Item.footer";
import { v4 } from "uuid";

export default React.memo(function ProjectDetailFoot(): React.JSX.Element {
    const project = React.useContext(ProjectContext);

    return (
        <div className=" h-full overflow-hidden">
            <div className="flex items-center justify-evenly gap-10">
                {project?.environment?.map((env) => <FooterItem key={v4()} env={env} />)}
            </div>

        </div>
    );
});
