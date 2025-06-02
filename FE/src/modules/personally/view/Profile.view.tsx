import React from "react";
import { Avatar } from "@personally/components/Avatar";
interface ProfileProps extends React.ComponentProps<"div"> { }
export default React.memo(function Profile({
    ...props
}: ProfileProps): React.JSX.Element {
    return (
        <div {...props}>
            {/* <picture>
            <source srcSet={user?.avatar_url} />
            <img src="/images/logo.png" alt={user?.full_name || user?.email} className="rounded-full object-cover size-15 mx-auto" />
        </picture> */}
            <Avatar />
        </div>
    );
});
