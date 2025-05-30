import React from "react";
const Dashboard = React.lazy(() => import("@dashboard/view/Dashboard.view"))
const SidebarLayout = React.lazy(() => import("@/layouts/SidebarLayout/SidebarLayout"))
const HRightContent = React.lazy(() => import("@dashboard/layout/HRightContent"))
const DashboardRouter = [

    {
        path: "",
        element: <SidebarLayout rightHeadContent={<HRightContent />} />,
        children: [
            {
                index: true,
                element: <Dashboard />,
                handle: { title: "Dashboard" }
            }
        ]
    }
]
export default DashboardRouter