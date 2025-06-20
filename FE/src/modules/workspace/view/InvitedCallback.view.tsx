import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useAccepInvite } from "@workspace/flow/workspace/workspace.service";
import type { Workspace } from "@workspace/models/response.model";
import LoadingFallback from "@components/LoadingFallback.component";
export default function InvitedCallback(): React.JSX.Element {
    const { token } = useLoaderData();
    const acceptInvite = useAccepInvite();
    const navigate = useNavigate();
    React.useEffect(() => {
        acceptInvite.mutate(token, {
            onSuccess: (data: { success: boolean; data: Workspace }) => {
                navigate(`/workspace/${data.data.id}`);
            },
            onError: () => {
                navigate("/");
            },
        });
    }, []);
    if (acceptInvite.isPending) return <LoadingFallback />;
    return <></>;
}
