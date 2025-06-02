import type { AppState } from "@/stores";
import React from "react";
import { useSelector } from "react-redux";
interface ProfileProps extends React.ComponentProps<"div"> {

}
export default React.memo(function Profile({ ...props }: ProfileProps): React.JSX.Element {
    const user = useSelector((state: AppState) => state.persist.auth.user)
    return <div {...props}>
        <picture>
            <source srcSet={user?.avatar_url} />
            <img src="/images/logo.png" alt="" />
        </picture>
    </div>
})