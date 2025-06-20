import React from "react";
import { ProjectContext } from "@project/components/detail";
import FooterItem from "./Item.footer";

export default React.memo(function ProjectDetailFoot(): React.JSX.Element {
    const project = React.useContext(ProjectContext);

    return (
        <div className=" h-full overflow-hidden">
            <div className="flex items-center justify-evenly gap-10">
                {project?.environment?.map((env) => <FooterItem env={env} />)}
            </div>

        </div>
    );
});
