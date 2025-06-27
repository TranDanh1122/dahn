import React from "react";
import { useSelector } from "react-redux";
import type { AppState } from "@/stores";
import DBWorkspaceListComponent from "@dashboard/components/DBWorkspaceList.component";
import { BreadscrumContext } from "@/context/Breadscrum.context";
export default function Dashboard(): React.JSX.Element {
    const user = useSelector((state: AppState) => state.persist.auth.user);
    const { setBreadscrum } = React.useContext(BreadscrumContext)
    React.useEffect(() => {
        setBreadscrum([
            {
                link: "/",
                text: "Dashboard"
            },
        ])
    }, [])
    return (
        <div className="">
            <div className="space-y-2">
                <h1 className="text-slate-950 text-2xl font-bold py-20 px-4">
                    Hi {user?.full_name ?? user?.email}! Welcome to my app, hope you have
                    a nice trip!
                </h1>
            </div>
            <DBWorkspaceListComponent />
        </div>
    );
}
