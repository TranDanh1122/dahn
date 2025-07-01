import React from "react";
import { ProjectContext } from "@project/components/detail";
import FooterItemComponent from "../FooterItem.component";
export default function Footer(): React.JSX.Element {
    const project = React.useContext(ProjectContext);
    const footer = React.useMemo(() => {
        return project?.environment?.map((env) => <FooterItemComponent key={env.id} env={env} />)
    }, [project?.environment])
    return (<>{footer}</>)
}