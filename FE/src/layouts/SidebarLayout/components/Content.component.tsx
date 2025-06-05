import React from "react";
import { Outlet } from "react-router-dom";
export default React.memo(function Content(): React.JSX.Element {
    return (<Outlet />);
});
