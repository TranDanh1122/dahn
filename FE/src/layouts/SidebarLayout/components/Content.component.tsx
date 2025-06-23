import React from "react";
import { Outlet } from "react-router-dom";
export default React.memo(function Content(): React.JSX.Element {
    return (<div className="h-[calc(100vh-60px)] overflow-hidden"><Outlet /></div>);
});
