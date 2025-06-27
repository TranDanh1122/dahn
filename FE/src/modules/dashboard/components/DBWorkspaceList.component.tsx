import React from "react";
import { useGetWorkspaceSvc } from "@workspace/flow/workspace/workspace.service";
import { Link, useNavigate } from "react-router-dom";
import ListItemButton from "@components/ListItemButton.component";
import SquareItem from "@components/ListItem.component";
export default React.memo(function DBWorkspaceList(): React.JSX.Element {
    const { data, isLoading } = useGetWorkspaceSvc();
    const navigate = useNavigate();
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h2 className="font-medium text-lg">My Workspace</h2>
                <Link to="" className=" underline text-slate-500">
                    View all
                </Link>
            </div>
            <div className="grid grid-cols-5 gap-10 auto-rows-[230px]">
                {isLoading &&
                    Array.from({ length: 4 }).map((_, index) => {
                        return <SquareItem key={index} skeletonMode={true} />;
                    })}
                {!isLoading &&
                    data &&
                    data.length > 0 &&
                    data.slice(0, Math.max(data.length - 1, 3)).map((el) => {
                        return (
                            <SquareItem
                                onClick={() => navigate(`workspace/${el.id}`)}
                                key={el.id}
                                img={el.thumbnail}
                                title={el.name}
                                lastUpdate={el.created_at}
                            />
                        );
                    })}

                {!isLoading && (
                    <ListItemButton
                        onClick={() => navigate("/workspace/create")}
                        title="Add new workspace">
                        <p className="font-black text-8xl text-slate-400">+</p>
                    </ListItemButton>
                )}
            </div>
        </div>
    );
});
