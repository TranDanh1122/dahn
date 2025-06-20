import type { AppState } from "@/stores";
import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import CircleLogoWText from "./CircleLogoWText.component"

export default React.memo(function User(props: React.ComponentProps<"div">): React.JSX.Element {
    const { user } = useSelector((state: AppState) => state.persist.auth, shallowEqual)
    console.log("re-render 3")
    return <CircleLogoWText className={props.className} img={user?.avatar_url || ""} imgAlt={user?.full_name} text={user?.full_name || user?.email || ""}>
        <div className="bg-white text-slate-600 font-light absolute w-max top-full left-0 hidden group-hover:block shadow-md p-2 z-20 border-slate-400 rounded-lg">
            {user?.email || user?.full_name}
        </div>
    </CircleLogoWText>



}, () => true)