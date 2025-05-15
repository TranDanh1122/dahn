import React from "react";
import { Outlet } from "react-router-dom";
export default function BeforeEachRoute(): React.JSX.Element {
    return <Outlet />
}