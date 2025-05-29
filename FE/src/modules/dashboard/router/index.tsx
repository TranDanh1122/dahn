import React from "react";
const Dashboard = React.lazy(() => import("@dashboard/view/Dashboard.view"))
const DashboardRouter = [
    {
        path: "",
        element: <Dashboard/>
    }
]
export default DashboardRouter