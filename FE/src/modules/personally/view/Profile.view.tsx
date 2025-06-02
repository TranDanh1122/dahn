import type { AppState } from "@/stores";
import React from "react";
import { useSelector } from "react-redux";
import { ImageUpload } from "@components/ImageUpload";
interface ProfileProps extends React.ComponentProps<"div"> { }
export default React.memo(function Profile({
    ...props
}: ProfileProps): React.JSX.Element {
    const user = useSelector((state: AppState) => state.persist.auth.user);
    return (
        <div {...props}>
            {/* <picture>
            <source srcSet={user?.avatar_url} />
            <img src="/images/logo.png" alt={user?.full_name || user?.email} className="rounded-full object-cover size-15 mx-auto" />
        </picture> */}
            <div className="rounded-full">
                <ImageUpload
                    id="avatar_upload"
                    reactValue={user?.avatar_url ?? "/image/logo.png"}
                />
            </div>
        </div>
    );
});
