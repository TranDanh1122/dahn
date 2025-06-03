import React from "react";
const Dashboard = React.lazy(() => import("@dashboard/view/Dashboard.view"))
const HRightContent = React.lazy(() => import("@dashboard/layout/HRightContent"))
const DashboardRouter = [

    {
        path: "",
        children: [
            {
                index: true,
                element: <Dashboard />,
                handle: { title: "Dashboard", rightHeadContent: <HRightContent /> }
            }
        ]
    }
]
export default DashboardRouter