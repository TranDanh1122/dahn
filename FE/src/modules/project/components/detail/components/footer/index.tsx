import React from "react";
import { ProjectContext } from "@project/components/detail";
import FooterItemComponent from "../FooterItem.component";
import CirclePlus from "lucide-react/dist/esm/icons/circle-plus";
import type { FormModalRef } from "@components/Formodal/type";
import { envSchema } from "@project/models/request.schema";

export default function Footer(): React.JSX.Element {
    const project = React.useContext(ProjectContext);
    const handleClick = () => {

    }

    const modalRef = React.useRef<FormModalRef | null>(null);

    const initData = React.useMemo(() => {
        return Object.fromEntries(
            Object.keys(envSchema.shape).map((el) => [
                el,
                project?.[el as keyof typeof project],
            ])
        );
    }, [project]);

    const footer = React.useMemo(() => {
        return project?.environment?.map((env) => <FooterItemComponent onClick={handleClick} key={env.id} env={env} />)
    }, [project?.environment])
    return (<>
        <CirclePlus className="size-5 text-slate-600 absolute -top-10 right-0" />
        {footer}
    </>)
}