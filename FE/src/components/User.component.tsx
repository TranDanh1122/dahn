import type { AppState } from "@/stores";
import React from "react";
import { useSelector } from "react-redux";

export default React.memo(function User(props: React.ComponentProps<"div">): React.JSX.Element {
    const { user } = useSelector((state: AppState) => state.persist.auth)

    return <div className={`flex items-center gap-1 hover:bg-neutral-100 ${props.className} px-2 py-1 rounded-lg`}>
        <picture className="shrink-0">
            <source srcSet="/images/logo.png" />
            <img src={user?.avatar_url} alt={user?.email || user?.full_name} className="object-cover rounded-full size-10 border border-neutral-300 shrink-0" />
        </picture>
        <div className="w-full relative group shrink">
            <p className="max-w-2/3 truncate font-medium cursor-pointer text-sm">
                {user?.email || user?.full_name}  </p>
            <div className="bg-white text-neutral-600 font-light absolute w-max top-full left-0 hidden group-hover:block shadow-md p-2 z-10 border-neutral-400 rounded-lg">
                {user?.email || user?.full_name}
            </div>
        </div>
    </div>
})